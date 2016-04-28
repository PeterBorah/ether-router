contract SenderChecker {
  function checkSender() returns(address) {
    return msg.sender;
  }
}
