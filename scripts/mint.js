const HDWalletProvider = require("truffle-hdwallet-provider")
const web3 = require('web3')
const MNEMONIC = process.env.MNEMONIC
const INFURA_KEY = process.env.INFURA_KEY
const FACTORY_CONTRACT_ADDRESS = process.env.FACTORY_CONTRACT_ADDRESS
const NFT_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS
const OWNER_ADDRESS = process.env.OWNER_ADDRESS
const NETWORK = process.env.NETWORK


if (!MNEMONIC || !INFURA_KEY || !OWNER_ADDRESS || !NETWORK) {
  console.error("Please set a mnemonic, infura key, owner, network, and contract address.")
  return
}

const NFT_ABI = [{
  "constant": false,
  "inputs": [{
    "name": "_to",
    "type": "address"
  }],
  "name": "mintTo",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}]

const FACTORY_ABI = [{
  "constant": false,
  "inputs": [{
      "name": "_optionId",
      "type": "uint256"
    },
    {
      "name": "_toAddress",
      "type": "address"
    }
  ],
  "name": "mint",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}]

async function main() {
  console.log("Running minting...")

  const provider = new HDWalletProvider(MNEMONIC, `https://${NETWORK}.infura.io/${INFURA_KEY}`)
  const web3Instance = new web3(provider)

  try {
    if (NFT_CONTRACT_ADDRESS) {
        console.log("contract address: " + NFT_CONTRACT_ADDRESS)
    
        const nftContract = new web3Instance.eth.Contract(NFT_ABI, NFT_CONTRACT_ADDRESS, {
          gasLimit: "1000000"
        })
        const result = await nftContract.methods.mintTo(OWNER_ADDRESS).send({
          from: OWNER_ADDRESS
        });
        console.log("Minted solToken. Transaction: " + result.transactionHash)
    
      } else if (FACTORY_CONTRACT_ADDRESS) {
        console.log("factory contract address: " + FACTORY_CONTRACT_ADDRESS)
    
        const factoryContract = new web3Instance.eth.Contract(FACTORY_ABI, FACTORY_CONTRACT_ADDRESS, {
          gasLimit: "1000000"
        })
        const result = await factoryContract.methods.mint(DEFAULT_OPTION_ID, OWNER_ADDRESS).send({
          from: OWNER_ADDRESS
        });
        console.log("Minted solToken. Transaction: " + result.transactionHash)
      }
      return;
      
  } catch (ex) {
      console.error(ex)
      return
  }

}

main();