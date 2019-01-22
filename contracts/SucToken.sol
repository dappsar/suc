pragma solidity ^0.5.0;

import "/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";

/**
  * @title Suc Contract
  *
  * @dev We inherited it from two contracts: ERC721Token to make it represent a non-fungible token, and from the Ownable contract.
  *
  * @dev Ownable allows managing authorization. It assigns ownership to deployer (when the contract is deployed) and adds modifier onlyOwner that allows you to restrict certain methods only to contract owner. Also, you can transfer ownership.
  */
contract SucToken is ERC721, Ownable {
  
  string public constant name = "SucToken";
  string public constant symbol = "SUC";

}