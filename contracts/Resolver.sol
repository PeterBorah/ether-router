pragma solidity ^0.4.2;

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

  function lookup(bytes4 sig) returns(address destination, uint outsize, address length_destination, bytes4 length_sig) {
    if (pointers[sig].destination == 0) {
      destination = fallback;
      outsize = 32;
    } else {
      destination = pointers[sig].destination;
      outsize = pointers[sig].outsize;
    }
    length_destination = length_pointers[sig].destination;
    length_sig = length_pointers[sig].sig;
  }
}
