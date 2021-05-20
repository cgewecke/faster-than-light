const YieldFarming = artifacts.require('YieldFarming')
const truffleAssert = require('truffle-assertions')
const { expectRevert, time } = require('@openzeppelin/test-helpers')
const { expect } = require('chai')

function timeout (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

contract('YieldFarming', (accounts) => {
  const [firstAccount, secondAccount] = accounts
  const TIMEOUT = 2
  beforeEach(async () => {
    const tokenName = 'A token name'
    const tokenSymbol = 'A token symbol'
    const interestRate = '0x3FFF71547652B82FE1777D0FFDA0D23A'
    const multiplier = '0x3FFF71547652B82FE1777D0FFDA0D23A'
    // const lockTime = time.duration.days(1)
    const lockTime = time.duration.seconds(TIMEOUT)
    this.yieldFarming = await YieldFarming.new(tokenName, tokenSymbol, interestRate, multiplier, lockTime)
  })
  it('Ownership', async () => {
    const firstOwner = await this.yieldFarming.owner()
    expect(firstOwner).to.equal(firstAccount)
    const result = await this.yieldFarming.transferOwnership(secondAccount)
    truffleAssert.eventEmitted(result, 'OwnershipTransferred', (ev) => {
      return ev.previousOwner === firstAccount && ev.newOwner === secondAccount
    }, 'OwnershipTransferred should be emitted with correct parameters')
    const secondOwner = await this.yieldFarming.owner()
    expect(secondOwner).to.equal(secondAccount)
  })
  describe('Release token', async () => {
    beforeEach(async () => {
      const value = 10000000000000
      await this.yieldFarming.deposit({ from: firstAccount, value })
    })
    // it('before unlock', async () => {
    //   // await timeout(TIMEOUT*1000)
    //   await expectRevert(
    //     this.yieldFarming.releaseTokens(),
    //     'TokenTimelock: current time is before release time'
    //   )
    // })
    it('after unlock', async () => {
      await timeout(TIMEOUT * 1000)
      await this.yieldFarming.releaseTokens()
    })
  })
})
