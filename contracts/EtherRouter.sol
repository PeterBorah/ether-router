pragma solidity ^0.4.2;
import "./Resolver.sol";

contract EtherRouter {
  Resolver resolver;
  address creator;

  function EtherRouter(Resolver _resolver) {
    resolver = _resolver;
    creator = msg.sender;
  }

  function() {
    uint r;

    // Get routing information for the called function
    var (destination, outsize, length_destination, length_sig) = resolver.lookup(msg.sig);

    // Get dynamic return size, if necessary
    if (length_destination != 0) {
      assembly {
        mstore(mload(0x40), length_sig)
        calldatacopy(add(4, mload(0x40)), 4, sub(calldatasize, 4))
        r := delegatecall(sub(gas, 10000), length_destination, mload(0x40), calldatasize, mload(0x40), 32)
        outsize := mul(mload(0x40), 32)
      }
    }

    // Make the call
    assembly {
      calldatacopy(mload(0x40), 0, calldatasize)
      r := delegatecall(sub(gas, 10000), destination, mload(0x40), calldatasize, mload(0x40), outsize)
    }

    // Throw if the call failed
    if (r != 1) { throw;}

    // Pass on the return value
    assembly {
      return(mload(0x40), outsize)
    }
  }
}
