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
