contract Counter {
  uint public count;

  function() {
    count++;
  }
  
  function ping() {
    count++;
  }
}
