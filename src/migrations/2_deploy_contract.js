const sucToken = artifacts.require("../contracts/principal/sucToken.sol");


//import "./nfTokenMetadata.sol";
//import "./nfTokenEnumerable.sol";
//import "./ownable.sol";

module.exports = function (deployer) {
  //deployer.deploy(Destructible).then(function () {
    //deployer.link(Destructible, sucToken)
    //return deployer.deploy(sucToken)
    // In order for both truffle and the truffle-solidity-loader to migrate successfully, 
    // the solution is to provide the gas in the migration scripts. That can be done per contract:
    deployer.deploy(sucToken, "sucToken1", "suc").then(function(){
      return console.log(sucToken.address);
    });
};
