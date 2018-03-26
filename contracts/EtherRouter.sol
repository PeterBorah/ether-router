pragma solidity ^0.4.8;
import "./Resolver.sol";

contract EtherRouter {
  Resolver resolver;

  function EtherRouter(Resolver _resolver) {
    resolver = _resolver;
  }

  function() payable {
    uint r;

    // Get routing information for the called function
    var (destination, outsize) = resolver.lookup(msg.sig, msg.data);

    // Make the call
    assembly {
      calldatacopy(mload(0x40), 0, calldatasize)
      r := delegatecall(sub(gas, 700), destination, mload(0x40), calldatasize, mload(0x40), outsize)
    }

    // Throw if the call failed
    if (r != 1) { throw;}

    // Pass on the return value
    assembly {
      return(mload(0x40), outsize)
    }
  }

  function getDynamicLength(address lengthDestination, bytes4 lengthSig, bytes msgData) returns(uint outsize) {
    uint r;
    bytes memory callData = msgData;
    
    // Replace signature in original calldata
    callData[0] = lengthSig[0];
    callData[1] = lengthSig[1];
    callData[2] = lengthSig[2];
    callData[3] = lengthSig[3];

    // Make the call
    assembly {
      let len := mload(callData)
      r := delegatecall(sub(gas, 700), lengthDestination, add(callData, 0x20), len, mload(0x40), 0x20)
      outsize := mul(mload(mload(0x40)), 0x20)
    }

    // Throw if the call failed
    if (r != 1) { throw;}
  }

}
