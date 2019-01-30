var sucToken = artifacts.require("sucToken");


//import "./nfTokenMetadata.sol";
//import "./nfTokenEnumerable.sol";
//import "./ownable.sol";

module.exports = function (deployer, network, accounts) {
  //deployer.deploy(Destructible).then(function () {
    //deployer.link(Destructible, sucToken)
    return deployer.deploy(sucToken)
  //});
};
