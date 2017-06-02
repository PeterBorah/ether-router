pragma solidity ^0.4.8;

contract PayableContract {
  address resolver;
  uint public sentAmount;

  function payFunction() payable {
    sentAmount = msg.value;
  }
}
