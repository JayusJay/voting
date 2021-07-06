const Voting = artifacts.require('voting.sol');

module.exports = function (deployer) {
  deployer.deploy(Voting);
};
