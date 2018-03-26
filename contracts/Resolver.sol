pragma solidity ^0.4.8;
import "./EtherRouter.sol";

contract Resolver {
  struct Pointer { address destination; uint outsize; }
  mapping (bytes4 => Pointer) public pointers;
  address public fallback;
  address public admin;
  EtherRouter public router;
  Resolver public replacement;

  struct LengthPointer { bytes4 sig; address destination; }
  mapping (bytes4 => LengthPointer) public lengthPointers;

  event FallbackChanged(address oldFallback, address newFallback); 
  event RouterChanged(address oldRouter, address newRouter); 

  modifier onlyAdmin {
    if (msg.sender != admin) { throw; }
    _;
  }

  function Resolver(address _fallback) {
    admin = msg.sender;
    fallback = _fallback;
  }

  // Public API
  function lookup(bytes4 sig, bytes msgData) returns(address, uint) {
    if (address(replacement) != 0) { return replacement.lookup(sig, msgData); } // If Resolver has been replaced, pass call to replacement

    return (destination(sig, msgData), outsize(sig, msgData));
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

  function registerLengthFunction(string mainSignature, string lengthSignature, address destination) onlyAdmin {
    lengthPointers[stringToSig(mainSignature)] = LengthPointer(stringToSig(lengthSignature), destination);
  }

  function setFallback(address _fallback) onlyAdmin {
    FallbackChanged(fallback, _fallback);
    fallback = _fallback;
  }

  function setRouter(EtherRouter _router) onlyAdmin {
    RouterChanged(router, _router);
    router = _router;
  }
  // Helpers

  function destination(bytes4 sig, bytes msgData) returns(address) {
    address storedDestination = pointers[sig].destination;
    if (storedDestination != 0) {
      return storedDestination;
    } else {
      return fallback;
    }
  }

  function outsize(bytes4 sig, bytes msgData) returns(uint) {
    if (lengthPointers[sig].destination != 0) {
      // Dynamically sized
      return dynamicLength(sig, msgData);
    } else if (pointers[sig].destination != 0) {
      // Stored destination and outsize
      return pointers[sig].outsize;
    } else {
      // Default
      return 32;
    }
  }

  function dynamicLength(bytes4 sig, bytes msgData) returns(uint outsize) {
    
    address lengthDestination = lengthPointers[sig].destination;
    bytes4 lengthSig = lengthPointers[sig].sig;
    
    outsize = router.getDynamicLength(lengthDestination, lengthSig, msgData);
  }

  function stringToSig(string signature) returns(bytes4) {
    return bytes4(sha3(signature));
  }
}
