import "Resolver.sol";

contract EtherRouter {
  Resolver resolver;
  address creator;

  function EtherRouter(Resolver _resolver) {
    resolver = _resolver;
    creator = msg.sender;
  }

  function() {
    var (destination, outsize, length_destination, length_sig) = resolver.lookup(msg.sig);
    if (length_destination != 0) {
      assembly {
        mstore(mload(0x40), length_sig)
        calldatacopy(add(4, mload(0x40)), 4, sub(calldatasize, 4))
        let r := delegatecall(sub(gas, 10000), length_destination, mload(0x40), calldatasize, mload(0x40), 32)
        outsize := mul(mload(0x40), 32)
      }
    }
    assembly {
      calldatacopy(mload(0x40), 0, calldatasize)
      let r := delegatecall(sub(gas, 10000), destination, mload(0x40), calldatasize, mload(0x40), outsize)
      return(mload(0x40), outsize)
    }
  }
}
