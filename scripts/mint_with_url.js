const HDWalletProvider = require("truffle-hdwallet-provider")
const web3 = require('web3')
const MNEMONIC = process.env.MNEMONIC || ""
const INFURA_KEY = process.env.INFURA_KEY || ""
const NFT_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS || ""
const OWNER_ADDRESS = process.env.OWNER_ADDRESS
const NETWORK = process.env.NETWORK || "rinkeby"
let TOKEN_ID = process.env.TOKEN_ID || 5
let TOKEN_URL = process.env.TOKEN_URL || "https://ipfs.infura.io/ipfs/QmdtAuZE1FqcK4npGnaMPvCsVQKt54FZ2dz2x4puJAfoDu"

if (!MNEMONIC || !INFURA_KEY || !OWNER_ADDRESS || !NETWORK) {
  console.error("Please set a mnemonic, infura key, owner, network, and contract address.")
  return
}

const NFT_ABI = [{
  "name": "mint",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function",
  "constant": false,
  "inputs": [{
    "name": "_to",
    "type": "address"
  },
  {
    "name": "_tokenId",
    "type": "uint256"
  },
  {
    "name": "_uri",
    "type": "string"
  }]
}]

async function main() {

  console.log("Running minting process...")

  const provider = new HDWalletProvider(MNEMONIC, `https://${NETWORK}.infura.io/${INFURA_KEY}`)
  const web3Instance = new web3(provider)

  try {
    console.log("using contract (address): " + NFT_CONTRACT_ADDRESS)

    const nftContract = new web3Instance.eth.Contract(NFT_ABI, NFT_CONTRACT_ADDRESS, {
      gasLimit: "1000000"
    })
    const result = await nftContract.methods.mint(OWNER_ADDRESS, TOKEN_ID, TOKEN_URL).send({
      from: OWNER_ADDRESS
    });

    console.log("Minted solToken. Transaction: " + result.transactionHash)
    console.log("minting process End")
    return;

  } catch (ex) {
    console.error(ex)
    return
  }

}

main();