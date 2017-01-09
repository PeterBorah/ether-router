pragma solidity ^0.4.7;

contract Resolver {
  struct Pointer { address destination; uint outsize; }
  mapping (bytes4 => Pointer) public pointers;
  address public fallback;
  address public admin;
  Resolver public replacement;

  struct LengthPointer { bytes4 sig; address destination; }
  mapping (bytes4 => LengthPointer) public length_pointers;

  modifier onlyAdmin {
    if (msg.sender != admin) { throw; }
    _;
  }

  function Resolver(address _fallback) {
    admin = msg.sender;
    fallback = _fallback;
  }

  // Public API
  function lookup(bytes4 sig, bytes msg_data) returns(address, uint) {
    if (address(replacement) != 0) { return replacement.lookup(sig, msg_data); } // If Resolver has been replaced, pass call to replacement

    return (destination(sig, msg_data), outsize(sig, msg_data));
  }

  // Administrative functions

  function setAdmin(address _admin) onlyAdmin {
    admin = _admin;
  }

  function replace(Resolver _replacement) onlyAdmin {
    replacement = _replacement;
  }

  function register(string signature, address destination, uint outsize) onlyAdmin {
    pointers[stringToSig(signature)] = Pointer(destination, outsize);
  }

  function registerLengthFunction(string main_signature, string length_signature, address destination) onlyAdmin {
    length_pointers[stringToSig(main_signature)] = LengthPointer(stringToSig(length_signature), destination);
  }

  function setFallback(address _fallback) onlyAdmin {
    fallback = _fallback;
  }

  // Helpers

  function destination(bytes4 sig, bytes msg_data) returns(address) {
    address storedDestination = pointers[sig].destination;
    if (storedDestination != 0) {
      return storedDestination;
    } else {
      return fallback;
    }
  }

  function outsize(bytes4 sig, bytes msg_data) returns(uint) {
    if (length_pointers[sig].destination != 0) {
      // Dynamically sized
      return dynamicLength(sig, msg_data);
    } else if (pointers[sig].destination != 0) {
      // Stored destination and outsize
      return pointers[sig].outsize;
    } else {
      // Default
      return 32;
    }
  }

  function dynamicLength(bytes4 sig, bytes msg_data) returns(uint outsize) {
    uint r;
    address length_destination = length_pointers[sig].destination;
    bytes4 length_sig = length_pointers[sig].sig;

    assembly {
      mstore(mload(0x40), length_sig)
      calldatacopy(add(4, mload(0x40)), 4, sub(calldatasize, 4))
      r := delegatecall(sub(gas, 700), length_destination, mload(0x40), calldatasize, mload(0x40), 32)
      outsize := mul(mload(0x40), 32)
    }

    // Throw if the call failed
    if (r != 1) { throw;}
  }

  function stringToSig(string signature) returns(bytes4) {
    return bytes4(sha3(signature));
  }
}
