contract Resolver {
  struct Pointer { address destination; uint outsize; }
  mapping (bytes4 => Pointer) public lookup;

  function register(string signature, address destination, uint outsize) {
    lookup[bytes4(sha3(signature))] = Pointer(destination, outsize);
  }
}
