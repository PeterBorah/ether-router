pragma solidity ^0.4.2;
contract SenderChecker {
  function checkSender() returns(address) {
    return msg.sender;
  }
}
