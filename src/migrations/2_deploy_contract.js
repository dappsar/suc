const sucToken = artifacts.require("../contracts/principal/sucToken.sol");


//import "./nfTokenMetadata.sol";
//import "./nfTokenEnumerable.sol";
//import "./ownable.sol";

module.exports = function (deployer) {
  //deployer.deploy(Destructible).then(function () {
    //deployer.link(Destructible, sucToken)
    //return deployer.deploy(sucToken)
    deployer.deploy(sucToken, "sucToken1", "suc");
  //});
};
