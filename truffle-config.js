require('babel-register')
require('babel-polyfill')

// I'll use Infura for publishing packages along with the truffle-hdwallet-provider NPM module
// and a 12-word hd-wallet mnemonic that represents our Ethereum address on the Ropsten network.
const HDWalletProvider = require("truffle-hdwallet-provider");
const MNEMONIC = process.env.MNEMONIC;
const INFURA_KEY = process.env.INFURA_KEY;
const FROM_ADDRESS = process.env.OWNER_ADDRESS;

/*
if (!MNEMONIC || !INFURA_KEY || !FROM_ADDRESS) {
  console.error("Please set a mnemonic, infura key and from address in an environment file (.env)");
  return;
}
*/

module.exports = {
  contracts_directory: "./src/contracts",
  contracts_build_directory: "./build/",
  migrations_directory: "./src/migrations",
  compilers: {
    solc: {
      version: "0.5.2",
      optimizer: {
          enabled: true,
          runs: 200
      }
    }
  },
  mocha: {
    useColors: true,
    reporter: 'eth-gas-reporter',
      reporterOptions : {
        currency: 'USD',
        gasPrice: 2
      }
  },
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*', // Match any network id
      gas: 6721975
    },
    ropsten: {
      provider: new HDWalletProvider(MNEMONIC, "https://ropsten.infura.io/v3/" + INFURA_KEY),
      from: FROM_ADDRESS,
      network_id: 3, // official id of the ropsten network,
      gas: 4200000
    },
    rinkeby: {
      provider: new HDWalletProvider(MNEMONIC, "https://rinkeby.infura.io/v3/" + INFURA_KEY),
      from: FROM_ADDRESS,
      network_id: 4, // official id of the rinkeby network,
      gas: 7000000
    },
    telsius: {
      host: "34.241.169.145",
      port: 22000,
      network_id: "*", // Match any network id
      gas: 0xffffff,
      gasPrice: 0x0,
      from: "0x42339e31a153db90c4f9af3326fc9c541b18225e"
    }
  }
};