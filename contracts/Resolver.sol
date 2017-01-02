pragma solidity ^0.4.7;

contract Resolver {
  struct Pointer { address destination; uint outsize; }
  mapping (bytes4 => Pointer) public pointers;
  address public fallback;
  address public admin;

  struct LengthPointer { bytes4 sig; address destination; }
  mapping (bytes4 => LengthPointer) public length_pointers;

  modifier onlyAdmin {
    if (msg.sender != admin) { throw; }
    _;
  }

  function setAdmin(address _admin) onlyAdmin {
    admin = _admin;
  }

  function Resolver(address _fallback) {
    admin = msg.sender;
    fallback = _fallback;
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

  function stringToSig(string signature) returns(bytes4) {
    return bytes4(sha3(signature));
  }

  function lookup(bytes4 sig, bytes msg_data) returns(address destination, uint outsize) {
    if (pointers[sig].destination == 0) {
      // Use fallback as default
      destination = fallback;
      outsize = 32;
    } else {
      destination = pointers[sig].destination;
      outsize = pointers[sig].outsize;
    }

    // Get dynamic return size, if necessary
    if (length_pointers[sig].destination != 0) {
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
  }
}
