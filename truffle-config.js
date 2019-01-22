require('babel-register')
require('babel-polyfill')


// I'll use Infura for publishing packages along with the truffle-hdwallet-provider NPM module
// and a 12-word hd-wallet mnemonic that represents our Ethereum address on the Ropsten network.
var HDWalletProvider = require("truffle-hdwallet-provider");

// 12-word mnemonic
var mnemonic = "flag general wool clog tunnel video clump bread close scene fortune grief";
var keyRopsten = "c42adc493eb84216a15d6d482dc9301c";
var keyRinkeby = "c42adc493eb84216a15d6d482dc9301c";

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*', // Match any network id
      gas: 6721975
    },
    ropsten: {
      provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/" + keyRopsten),
      network_id: 3, // official id of the ropsten network,
      gas: 4200000
    },
    rinkeby: {
      provider: new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/" + keyRinkeby),
      network_id: 4, // official id of the rinkeby network,
      gas: 1803609
    }
  }
};
