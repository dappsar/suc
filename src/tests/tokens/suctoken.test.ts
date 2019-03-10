import { Spec } from '@specron/spec';

/**
 * Spec context interfaces.
 */

interface Data {
  mToken?: any;
  owner?: string;
  bob?: string;
  jane?: string;
  sara?: string;
  zeroAddress?: string;
  id0?: string;
  id1?: string;
  id2: string;
  id3?: string;
  uri0?: string;
  uri1?: string;
  uri2?: string;
  uri3?: string;
}

/**
 * Spec stack instances.
 */

const spec = new Spec<Data>();

export default spec;

spec.beforeEach(async (ctx) => {
  const accounts = await ctx.web3.eth.getAccounts();
  ctx.set('owner', accounts[0]);
  ctx.set('bob', accounts[1]);
  ctx.set('jane', accounts[2]);
  ctx.set('sara', accounts[3]);
  ctx.set('zeroAddress', '0x0000000000000000000000000000000000000000');
});

spec.beforeEach(async (ctx) => {
  ctx.set('id0', '0');
  ctx.set('id1', '1');
  ctx.set('id2', '2');
  ctx.set('id3', '3');
  ctx.set('uri0', 'http://dummy.org/0');
  ctx.set('uri1', 'http://dummy.org/1');
  ctx.set('uri2', 'http://dummy.org/2');
  ctx.set('uri3', 'http://dummy.org/3');
});

spec.beforeEach(async (ctx) => {
  const mProxy = await ctx.deploy({ 
    src: './build/proxy.json',
    contract: 'Proxy'
  });
  ctx.set('mProxy', mProxy);

  const mToken = await ctx.deploy({ 
    src: './build/sucTokenTest.json',
    contract: 'SucTokenTest',
    args: ['Foo','F']
  });
  ctx.set('mToken', mToken);

  //  console.log (mToken.address;
  //await mProxy.instance.methods.upgradeTo(mToken.instance.address).call();

});

spec.test('correctly checks all the supported interfaces', async (ctx) => {
  const mToken = ctx.get('mToken');
  // ERC721
  const mTokenInterface = await mToken.instance.methods.supportsInterface('0x80ac58cd').call(); 
  // ERC721Metadata
  const mTokenMetadataInterface = await mToken.instance.methods.supportsInterface('0x5b5e139f').call(); 
  // ERC721Enumerable
  const mTokenEnumerableInterface = await mToken.instance.methods.supportsInterface('0x780e9d63').call();
  // ERC165
  const mErc165 = await mToken.instance.methods.supportsInterface('0x01ffc9a7').call();
  
  ctx.is(mTokenInterface, true);
  ctx.is(mTokenMetadataInterface, true);
  ctx.is(mTokenEnumerableInterface, true);
  ctx.is(mErc165, true);
});

spec.test('returns the correct issuer name', async (ctx) => {
  const mToken = ctx.get('mToken');
  const name = await mToken.instance.methods.name().call();

  ctx.is(name, "Foo");
});

spec.test('returns the correct issuer symbol', async (ctx) => {
  const mToken = ctx.get('mToken');
  const symbol = await mToken.instance.methods.symbol().call();

  ctx.is(symbol, "F");
});

spec.test('returns the correct NFT id 1 url', async (ctx) => {
  const mToken = ctx.get('mToken');
  const owner = ctx.get('owner');
  const bob = ctx.get('bob');
  const id1 = ctx.get('id1');
  const uri1 = ctx.get('uri1');
  
  await mToken.instance.methods.mint(bob, id1, uri1).send({ from: owner });
  const tokenURI = await mToken.instance.methods.tokenURI(id1).call();
  ctx.is(tokenURI, uri1);
});


spec.test('throws when trying to get URI of invalid NFT ID', async (ctx) => {
  const mToken = ctx.get('mToken');
  const id1 = ctx.get('id1');

  await ctx.reverts(() => mToken.instance.methods.tokenURI(id1).call());
});

spec.test('correctly mints a NFT', async (ctx) => {
  const mToken = ctx.get('mToken');
  const owner = ctx.get('owner');
  const bob = ctx.get('bob');
  const id1 = ctx.get('id1');
  const uri1 = ctx.get('uri1');

  const logs = await mToken.instance.methods.mint(bob, id1, uri1).send({ from: owner });
  ctx.not(logs.events.Transfer, undefined);
  const count = await mToken.instance.methods.balanceOf(bob).call();
  ctx.is(count.toString(), '1');
  const totalSupply = await mToken.instance.methods.totalSupply().call();
  ctx.is(totalSupply.toString(), '1');
});

spec.test('returns the correct token by index', async (ctx) => {
  const mToken = ctx.get('mToken');
  const owner = ctx.get('owner');
  const bob = ctx.get('bob');
  const sara = ctx.get('sara');
  const id1 = ctx.get('id1');
  const id2 = ctx.get('id2');
  const id3 = ctx.get('id3');
  const uri1 = ctx.get('uri1');
  const uri2 = ctx.get('uri2');
  const uri3 = ctx.get('uri3');

  await mToken.instance.methods.mint(bob, id1, uri1).send({ from: owner });
  await mToken.instance.methods.mint(bob, id2, uri2).send({ from: owner });
  await mToken.instance.methods.mint(sara, id3, uri3).send({ from: owner });

  const tokenIndex0 = await mToken.instance.methods.tokenByIndex(0).call();
  const tokenIndex1 = await mToken.instance.methods.tokenByIndex(1).call();
  const tokenIndex2 = await mToken.instance.methods.tokenByIndex(2).call();
  
  ctx.is(tokenIndex0, id1);
  ctx.is(tokenIndex1, id2);
  ctx.is(tokenIndex2, id3);
});

spec.test('throws when trying to mint with Id 0', async (ctx) => {
  const mToken = ctx.get('mToken');
  const owner = ctx.get('owner');
  const bob = ctx.get('bob');
  const id0 = ctx.get('id0');
  const uri0 = ctx.get('uri0');
  
  await ctx.reverts(() => mToken.instance.methods.mint(bob, id0, uri0).send({ from: owner }));
});


spec.test('throws when trying to get token by non-existing index', async (ctx) => {
  const mToken = ctx.get('mToken');
  const owner = ctx.get('owner');
  const bob = ctx.get('bob');
  const id1 = ctx.get('id1');
  const uri1 = ctx.get('uri1');

  await mToken.instance.methods.mint(bob, id1, uri1).send({ from: owner });
  await ctx.reverts(() => mToken.instance.methods.tokenByIndex(1).call());
});

spec.test('returns the correct token of owner by index', async (ctx) => {
  const mToken = ctx.get('mToken');
  const owner = ctx.get('owner');
  const bob = ctx.get('bob');
  const sara = ctx.get('sara');
  const id1 = ctx.get('id1');
  const id2 = ctx.get('id2');
  const id3 = ctx.get('id3');
  const uri1 = ctx.get('uri1');
  const uri2 = ctx.get('uri2');
  const uri3 = ctx.get('uri3');

  await mToken.instance.methods.mint(bob, id1, uri1).send({ from: owner });
  await mToken.instance.methods.mint(bob, id2, uri2).send({ from: owner });
  await mToken.instance.methods.mint(sara, id3, uri3).send({ from: owner });

  const tokenOwnerIndex1 = await mToken.instance.methods.tokenOfOwnerByIndex(bob, 1).call();
  ctx.is(tokenOwnerIndex1, id2);
});

spec.test('throws when trying to get token of owner by non-existing index', async (ctx) => {
  const mToken = ctx.get('mToken');
  const owner = ctx.get('owner');
  const bob = ctx.get('bob');
  const id1 = ctx.get('id1');
  const uri1 = ctx.get('uri1');

  await mToken.instance.methods.mint(bob, id1, uri1).send({ from: owner });
  await ctx.reverts(() => mToken.instance.methods.tokenOfOwnerByIndex(bob, 1).call());
});

spec.test('corectly burns a NFT', async (ctx) => {
  const mToken = ctx.get('mToken');
  const owner = ctx.get('owner');
  const bob = ctx.get('bob');
  const id1 = ctx.get('id1');
  const uri1 = ctx.get('uri1');

  await mToken.instance.methods.mint(bob, id1, uri1).send({ from: owner });
  const logs = await mToken.instance.methods.burn(id1).send({ from: owner });
  ctx.not(logs.events.Transfer, undefined);

  const balance = await mToken.instance.methods.balanceOf(bob).call();
  ctx.is(balance, '0');
  await ctx.reverts(() => mToken.instance.methods.ownerOf(id1).call());
  await ctx.reverts(() => mToken.instance.methods.tokenByIndex(0).call());
  await ctx.reverts(() => mToken.instance.methods.tokenOfOwnerByIndex(bob, 0).call());
});


spec.test('burn should correctly set ownerToIds and idToOwnerIndex and idToIndex', async (ctx) => {
  const mToken = ctx.get('mToken');
  const owner = ctx.get('owner');
  const bob = ctx.get('bob');
  const id1 = ctx.get('id1');
  const id2 = ctx.get('id2');
  const id3 = ctx.get('id3');

  await mToken.instance.methods.mint(bob, id1).send({ from: owner });
  await mToken.instance.methods.mint(bob, id3).send({ from: owner });
  await mToken.instance.methods.mint(bob, id2).send({ from: owner });

  //burn id1
  await mToken.instance.methods.burn(id1).send({ from: owner });

  let idToOwnerIndexId3 = await mToken.instance.methods.idToOwnerIndexWrapper(id3).call();
  let idToOwnerIndexId2 = await mToken.instance.methods.idToOwnerIndexWrapper(id2).call();
  ctx.is(idToOwnerIndexId3, '1');
  ctx.is(idToOwnerIndexId2, '0');

  let ownerToIdsLenPrior = await mToken.instance.methods.ownerToIdsLen(bob).call();
  let ownerToIdsFirst = await mToken.instance.methods.ownerToIdbyIndex(bob, 0).call();
  let ownerToIdsSecond = await mToken.instance.methods.ownerToIdbyIndex(bob, 1).call();
  ctx.is(ownerToIdsLenPrior, '2');
  ctx.is(ownerToIdsFirst, id2);
  ctx.is(ownerToIdsSecond, id3);

  let idToIndexFirst = await mToken.instance.methods.idToIndexWrapper(id2).call();
  let idToIndexSecond = await mToken.instance.methods.idToIndexWrapper(id3).call();
  ctx.is(idToIndexFirst, '0');
  ctx.is(idToIndexSecond, '1');

  let tokenIndexFirst = await mToken.instance.methods.tokenByIndex(0).call();
  let tokenIndexSecond = await mToken.instance.methods.tokenByIndex(1).call();
  ctx.is(tokenIndexFirst, id2);
  ctx.is(tokenIndexSecond, id3);

  //burn id2
  await mToken.instance.methods.burn(id2).send({ from: owner });

  idToOwnerIndexId3 = await mToken.instance.methods.idToOwnerIndexWrapper(id3).call();
  ctx.is(idToOwnerIndexId3, '0');

  ownerToIdsLenPrior = await mToken.instance.methods.ownerToIdsLen(bob).call();
  ownerToIdsFirst = await mToken.instance.methods.ownerToIdbyIndex(bob, 0).call();
  ctx.is(ownerToIdsLenPrior, '1');
  ctx.is(ownerToIdsFirst, id3);

  idToIndexFirst = await mToken.instance.methods.idToIndexWrapper(id3).call();
  ctx.is(idToIndexFirst, '0');

  tokenIndexFirst = await mToken.instance.methods.tokenByIndex(0).call();
  ctx.is(tokenIndexFirst, id3);

  //burn id3
  await mToken.instance.methods.burn(id3).send({ from: owner });

  idToOwnerIndexId3 = await mToken.instance.methods.idToOwnerIndexWrapper(id3).call();
  ctx.is(idToOwnerIndexId3, '0');

  ownerToIdsLenPrior = await mToken.instance.methods.ownerToIdsLen(bob).call();
  ctx.is(ownerToIdsLenPrior.toString(), '0');

  await ctx.throws(() => mToken.instance.methods.ownerToIdbyIndex(bob, 0).call());

  idToIndexFirst = await mToken.instance.methods.idToIndexWrapper(id3).call();
  ctx.is(idToIndexFirst, '0');
});

spec.test('transfer should correctly set ownerToIds and idToOwnerIndex and idToIndex', async (ctx) => {
  const mToken = ctx.get('mToken');
  const owner = ctx.get('owner');
  const bob = ctx.get('bob');
  const sara = ctx.get('sara');
  const id1 = ctx.get('id1');
  const id2 = ctx.get('id2');
  const id3 = ctx.get('id3');

  await mToken.instance.methods.mint(bob, id1).send({ from: owner });
  await mToken.instance.methods.mint(bob, id3).send({ from: owner });
  await mToken.instance.methods.mint(bob, id2).send({ from: owner });
  await mToken.instance.methods.transferFrom(bob, sara, id1).send({ from: bob });;

  const idToOwnerIndexId1 = await mToken.instance.methods.idToOwnerIndexWrapper(id1).call();
  const idToOwnerIndexId3 = await mToken.instance.methods.idToOwnerIndexWrapper(id3).call();
  const idToOwnerIndexId2 = await mToken.instance.methods.idToOwnerIndexWrapper(id2).call();
  ctx.is(idToOwnerIndexId1, '0');
  ctx.is(idToOwnerIndexId3, '1');
  ctx.is(idToOwnerIndexId2, '0');

  let ownerToIdsLenPrior = await mToken.instance.methods.ownerToIdsLen(bob).call();
  let ownerToIdsFirst = await mToken.instance.methods.ownerToIdbyIndex(bob, 0).call();
  let ownerToIdsSecond = await mToken.instance.methods.ownerToIdbyIndex(bob, 1).call();
  ctx.is(ownerToIdsLenPrior, '2');
  ctx.is(ownerToIdsFirst, id2);
  ctx.is(ownerToIdsSecond, id3);

  await ctx.throws(() => mToken.instance.methods.ownerToIdbyIndex(bob, 2).call());
  
  ownerToIdsLenPrior = await mToken.instance.methods.ownerToIdsLen(sara).call();
  ownerToIdsFirst = await mToken.instance.methods.ownerToIdbyIndex(sara, 0).call();
  ctx.is(ownerToIdsLenPrior, '1');
  ctx.is(ownerToIdsFirst, id1);
});