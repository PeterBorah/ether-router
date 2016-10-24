pragma solidity ^0.4.2;
contract SimpleStore {
  address resolver;
  uint n;

  function store(uint _n) {
    n = _n;
  }

  function getStored() returns (uint) {
    return n;
  }
}
