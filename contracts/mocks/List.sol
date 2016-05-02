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

  function getAll(uint key) returns(uint[]) {
    return data[key];
  }

  function() returns(uint) {
    return 43;
  }
}
