const YieldFarming = artifacts.require('YieldFarming')

module.exports = async (deployer) => {
  await deployer.deploy(YieldFarming)
}
