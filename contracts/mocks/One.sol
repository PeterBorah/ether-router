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
