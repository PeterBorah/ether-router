pragma solidity ^0.4.2;

contract List {
  address resolver;
  address creator;
  mapping (uint => uint[]) data;

  function setList(uint key, uint[] _data) {
    data[key] = _data;
  }

  function getLength(uint key) returns(uint) {
    return data[key].length;
  }

  function getReturnSize(uint key) returns(uint) {
    // Returning a dynamically-sized array requires two extra slots.
    // One for the data location pointer, and one for the length.
    return data[key].length + 2;
  }

  function getAll(uint key) returns(uint[]) {
    return data[key];
  }
}
