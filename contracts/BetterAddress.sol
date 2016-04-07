contract BetterAddress {
  address public destination;

  function set_destination(address _destination) {
    destination = _destination;
  }

  function get_destination() returns(address) {
    address dest = 0;
    assembly { 
      destination pop
      sload
      =: dest
    }

    return dest;
  }

  function() {
    address d = destination;
    assembly {
      calldatacopy(mload(0x40), 0, calldatasize)
      mstore(add(mload(0x40), calldatasize), 0x40)
      let r := call(1000000, d, 0, mload(0x40), calldatasize, mload(0x40), 32)
      return(mload(0x40), 32)
    }
  }
}
