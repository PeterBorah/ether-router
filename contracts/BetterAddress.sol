contract BetterAddress {
  address public destination;
  bytes4 data;

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
}
