const sucToken = artifacts.require("./sucToken.sol");
const proxy = artifacts.require("./proxy.sol");

module.exports = function (deployer, network) {
    if (network.startsWith("alastria") || network.startsWith("telsius")) {
      web3.personal.unlockAccount("0x42339e31a153db90c4f9af3326fc9c541b18225e", "l@z@r0");
    }

    /*
    deployer.deploy(sucToken, "sucToken1", "suc").then(function(){
      return console.log("SucToken Address: " + sucToken.address);
    });
    */
    deployer.deploy(proxy).then(function(){
      return deployer.deploy(sucToken, "sucToken1", "suc").then(function(){
        return console.log("SucToken Address: " + sucToken.address + ", proxy Address: " + proxy.address);
      });
    });
    
}; 
