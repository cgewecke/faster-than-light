// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Migrations {
  address public owner = msg.sender;
  uint public lastCompletedMigration;

  modifier restricted() {
    require(
      msg.sender == owner,
      "Only contract's owner!"
    );
    _;
  }

  function setCompleted(uint completed) public restricted {
    lastCompletedMigration = completed;
  }
}
