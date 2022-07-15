const { ethers } = require("hardhat");
const assert = require("assertion");

describe("RewardsETH", function () {
  let RdToken_contract;
  let RdToken ;
  let RdToken_instance;
  
  let StToken_contract;
  let StToken;
  let StToken_instance;

  let RewardsETH_contract;
  let RewardsETH;
  let RewardsETH_instance;
  
  beforeEach(async () => {
    
    [owner] = await ethers.getSigners();

    RdToken_contract = await ethers.getContractFactory("RewardToken");
    RdToken = await RdToken_contract.deploy();
    RdToken_instance = await RdToken.deployed();
    
    StToken_contract = await ethers.getContractFactory("StakeToken");
    StToken = await StToken_contract.deploy();
    StToken_instance = await StToken.deployed();

    RewardsETH_contract = await ethers.getContractFactory("NewRewardsETH");
    RewardsETH = await RewardsETH_contract.deploy(RdToken_instance.address, StToken_instance.address);
    RewardsETH_instance = await RewardsETH.deployed();
  });

  it("Check owner's RewardsTokenBalance and StakeTokenBalance", async function () {
    assert.equal(await RdToken_instance.balanceOf(owner.address), 1000000000000000000000000);
    assert.equal(await StToken_instance.balanceOf(owner.address), 1000000000000000000000000);
  });

  it("Test setRewardParams() function", async function() {
    await RdToken_instance.transfer(RewardsETH_instance.address, 1000, {from: owner.address});
    await RewardsETH_instance.setRewardParams(1, 1, {from: owner.address});
  });

  it("Stake 100 Token", async function () {
    await StToken_instance.approve(RewardsETH_instance.address, 100, {from: owner.address});
    await RewardsETH_instance.stake(100, {from: owner.address, value: 0})
    assert.equal(await RewardsETH_instance.totalSupply(), 100)
  });

  it("withdraw 100 Token", async function () {
    
    await StToken_instance.approve(RewardsETH_instance.address, 100, {from: owner.address});
    await RewardsETH_instance.stake(100, {from: owner.address, value: 0})
    
    await RewardsETH_instance.withdraw(100, {from: owner.address});
  });

  it("Test exit() function", async function () {

    await StToken_instance.approve(RewardsETH_instance.address, 100, {from: owner.address});
    await RewardsETH_instance.stake(100, {from: owner.address, value: 0})

    await RewardsETH_instance.exit();
  });

  it("Test getReward() function", async function () {
    
    await StToken_instance.approve(RewardsETH_instance.address, 100, {from: owner.address});
    await RewardsETH_instance.stake(100, {from: owner.address, value: 0})
    
    await RewardsETH_instance.getReward({from:owner.address});
  })

  it("Test withdrawReward() function ", async function() {
    await StToken_instance.approve(RewardsETH_instance.address, 100, {from: owner.address});
    await RewardsETH_instance.stake(100, {from: owner.address, value: 0});
    await RdToken_instance.transfer(RewardsETH_instance.address, 1000, {from: owner.address});
    await RewardsETH_instance.withdrawReward({from: owner.address});
  });

  it("Test setMaxStakingAmount() Function ", async function () {
    await RewardsETH_instance.setMaxStakingAmount(ethers.utils.parseEther("3"), {from: owner.address});
    assert.equal(await RewardsETH_instance.maxStakingAmount(), 3000000000000000000);
  });

  it("Test setBuyback() function", async function() {
    await RewardsETH_instance.setBuyback(2, {from:owner.address});
    assert.equal(await RewardsETH_instance.buyback(), 2);
  });
});
