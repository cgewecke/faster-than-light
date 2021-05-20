const YieldFarming = artifacts.require('YieldFarming')
const truffleAssert = require('truffle-assertions')
const { BN, expectRevert, time } = require('@openzeppelin/test-helpers')
const { expect } = require('chai')

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

contract('YieldFarming', (accounts) => {
  const [ firstAccount, secondAccount ] = accounts;
  
  beforeEach(async () => {
    const tokenName = 'A token name'
    const tokenSymbol = 'A token symbol'
    const interestRate = '0x3FFF71547652B82FE1777D0FFDA0D23A'
    const multiplier = '0x3FFF71547652B82FE1777D0FFDA0D23A'
    // const lockTime = time.duration.days(1)
    const lockTime = time.duration.seconds(1)
    this.yieldFarming = await YieldFarming.new(tokenName, tokenSymbol, interestRate, multiplier, lockTime)
  })
  it('Ownership', async () => {
    const firstOwner = await this.yieldFarming.owner()
    expect(firstOwner).to.equal(firstAccount)
    const result = await this.yieldFarming.transferOwnership(secondAccount)
    truffleAssert.eventEmitted(result, 'OwnershipTransferred', (ev) => {
      return ev.previousOwner === firstAccount && ev.newOwner === secondAccount;
    }, 'OwnershipTransferred should be emitted with correct parameters');
    const secondOwner = await this.yieldFarming.owner()
    expect(secondOwner).to.equal(secondAccount)
  })
  it('Deposit', async () => {
    const value = 10000000000000
    await this.yieldFarming.deposit({from: firstAccount, value})
    await timeout(1000)
    await this.yieldFarming.releaseTokens()
  })
})
