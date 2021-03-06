pragma solidity 0.5.2;

/**
 * @dev A standard for detecting smart contract interfaces. 
 * See: https://github.com/ethereum/EIPs/blob/master/EIPS/eip-165.md.
 */
interface ERC165
{

  /**
   * @dev Checks if the smart contract includes a specific interface.
   * @notice This function uses less than 30,000 gas.
   * @param _interfaceId The interface identifier, as specified in ERC-165.
   * @return True if _interfaceId is supported, false otherwise.
   */
  function supportsInterface(
    bytes4 _interfaceId
  )
    external
    view
    returns (bool);
    
}
