pragma solidity ^0.4.8;

contract Migrations {
  address public admin;
  uint public last_completed_migration;

  modifier onlyAdmin() {
    if (msg.sender == admin) _;
  }

  function Migrations() {
    admin = msg.sender;
  }

  function setCompleted(uint completed) onlyAdmin {
    last_completed_migration = completed;
  }
}
