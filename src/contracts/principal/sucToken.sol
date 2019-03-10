pragma solidity 0.5.2;

import "../tokens/nfTokenMetadata.sol";
import "../tokens/nfTokenEnumerable.sol";
import "../ownership/ownable.sol";

/**
 * @title suc Token implementation with enumerable and metadata extensions.
 */
contract SucToken is
  NFTokenEnumerable,
  NFTokenMetadata,
  Ownable
{

  // The address of the contract creator
  address internal creator;

	// Usado para detener el contrato (parte de implementación de circuit-breakers)
	bool private stopped = false;

  /**
   * @dev Contract constructor.
   * @param _name A descriptive name for a collection of NFTs.
   * @param _symbol An abbreviated name for NFTokens.
   */
  constructor(
    string memory _name,
    string memory _symbol
  )
    public
  {
    // Store the address of the creator
    creator = msg.sender;

    nftName = _name;
    nftSymbol = _symbol;
  }

  /**
   * @dev Mints a new NFT.
   * @param _to The address that will own the minted NFT.
   * @param _tokenId of the NFT to be minted by the msg.sender.
   * @dev 'stopInEmergency' circuit-breaker pattern implementation
   */
  function mint(
    address _to,
    uint256 _tokenId
  )
    external
    onlyOwner
    stopInEmergency
  {
    super._mint(_to, _tokenId);
  }

  /**
   * @dev Mints a new NFT.
   * @param _to The address that will own the minted NFT.
   * @param _tokenId of the NFT to be minted by the msg.sender.
   * @param _uri String representing RFC 3986 URI.
   */
  function mint(
    address _to,
    uint256 _tokenId,
    string calldata _uri
  )
    external
    onlyOwner
    stopInEmergency
  {
    super._mint(_to, _tokenId);
    super._setTokenUri(_tokenId, _uri);
  }

  /**
   * @dev Removes a NFT from owner.
   * @param _tokenId Which NFT we want to remove.
   * @dev 'stopInEmergency' circuit-breaker pattern implementation
   */
  function burn(uint256 _tokenId) external onlyOwner stopInEmergency
  {
    super._burn(_tokenId);
  }

	/**
		* @dev Cambiar un flag (stopped) en caso de algun error que requiera la 
		* @dev implementación de detención de código (circuit-breaker)
		* @dev Hace uso del modificador 'onlyOwner' de la interfaz @Ownable
		*/
	function toggleContractActive() onlyOwner external
	{
		stopped = !stopped;
	}

	/**
		* @dev Implementación de modificador para detener la ejecución de una función
		* @dev en caso de emergencia
	  */
	modifier stopInEmergency { if (!stopped) _; }

	/**
		* @dev Implementación de modificador para ejecución de una función solo en caso
		* @dev de emergencia
		* @dev por el momento, modificador no utiliza den alguna función
		*/
	modifier onlyInEmergency { if (stopped) _; }

}
