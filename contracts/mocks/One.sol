pragma solidity ^0.4.2;
contract One {
  address resolver;
  uint one;
  
  function setOne(uint _one) {
    one = _one;
  }

  function getOne() returns(uint) {
    return one;
  }
}
