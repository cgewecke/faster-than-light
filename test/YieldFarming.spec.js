const YieldFarming = artifacts.require('YieldFarming')
const truffleAssert = require('truffle-assertions')
const { BN, expectRevert, time } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');

contract('YieldFarming', (accounts) => {
  it('Ownership', async () => {
    const yieldFarming = await YieldFarming.deployed()
    const firstOwner = await yieldFarming.owner()
    assert(firstOwner === accounts[0], 'First owner different than accounts[0]!')
    const result = await yieldFarming.transferOwnership(accounts[1])
    truffleAssert.eventEmitted(result, 'OwnershipTransferred', (ev) => {
      return ev.previousOwner === accounts[0] && ev.newOwner === accounts[1];
    }, 'OwnershipTransferred should be emitted with correct parameters');
    const secondOwner = await yieldFarming.owner()
    assert(secondOwner === accounts[1], 'Second owner different than accounts[1]!')
  })
})
