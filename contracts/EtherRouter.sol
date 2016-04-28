import "Resolver.sol";

contract EtherRouter {
  Resolver resolver;

  function EtherRouter(Resolver _resolver) {
    resolver = _resolver;
  }

  function() {
    var (destination, outsize) = resolver.lookup(msg.sig);
    assembly {
      calldatacopy(mload(0x40), 0, calldatasize)
      let r := delegatecall(1000000, destination, mload(0x40), calldatasize, mload(0x40), outsize)
      return(mload(0x40), outsize)
    }
  }
}
