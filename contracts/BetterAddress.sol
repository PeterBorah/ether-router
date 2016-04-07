import "Resolver.sol"; 

contract BetterAddress {
  Resolver resolver;

  function BetterAddress() {
    resolver = new Resolver();
  }

  function() {
    var (destination, outsize) = resolver.lookup(msg.sig);
    assembly {
      let inloc := mload(0x40)
      calldatacopy(inloc, 0, calldatasize)
      let outloc := add(inloc, calldatasize)
      mstore(0x40, outloc)
      let r := callcode(1000000, destination, 0, inloc, calldatasize, outloc, outsize)
      mstore(0x40, add(outloc, outsize))
      return(outloc, outsize)
    }
  }
}
