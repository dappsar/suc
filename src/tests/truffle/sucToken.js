const SucToken = artifacts.require('sucToken');
contract('Suc token', accounts => {
  it('Should make first account an owner', async () => {
    let instance = await SucToken.deployed();
    let owner = await instance.owner();
    assert.equal(owner, accounts[0]);
  });
});
