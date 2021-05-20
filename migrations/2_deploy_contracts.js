const YieldFarming = artifacts.require('YieldFarming')

// string memory _tokenName, string memory _tokenSymbol, bytes16 _interestRate, bytes16 _multiplier, uint _lockTime
module.exports = async (deployer) => {
  const tokenName = 'A token name'
  const tokenSymbol = 'A token symbol'
  const interestRate = '0x3FFF71547652B82FE1777D0FFDA0D23A'
  const multiplier = '0x3FFF71547652B82FE1777D0FFDA0D23A'
  const lockTime = 1
  await deployer.deploy(YieldFarming, tokenName, tokenSymbol, interestRate, multiplier, lockTime)
}
