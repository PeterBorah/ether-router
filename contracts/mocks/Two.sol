import "mocks/One.sol";

contract Two is One {
  uint two;
  
  function setTwo(uint _two) {
    two = _two;
  }

  function getTwo() returns(uint) {
    return two;
  }
}
