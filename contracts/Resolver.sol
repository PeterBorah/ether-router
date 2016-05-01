contract Resolver {
  struct Pointer { address destination; uint outsize; }
  mapping (bytes4 => Pointer) public pointers;
  address public fallback;

  function Resolver(address _fallback) {
    fallback = _fallback;
  }

  function register(string signature, address destination, uint outsize) {
    pointers[bytes4(sha3(signature))] = Pointer(destination, outsize);
  }

  function setFallback(address _fallback) {
    fallback = _fallback;
  }

  function lookup(bytes4 sig) returns(address destination, uint outsize) {
    if (pointers[sig].destination == 0) {
      destination = fallback;
      outsize = 32;
    } else {
      destination = pointers[sig].destination;
      outsize = pointers[sig].outsize;
    }
  }
}
