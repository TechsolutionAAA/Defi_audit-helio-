const { ethers } = require("hardhat");

describe("LOOT", function () {
  it("If owner address has been added in controller, it have to return true, if not, false", async function () {
    [owner] = await ethers.getSigners();

    // get owner address
    console.log(`Owner Address =>`, owner.address);

    const LOOT = await ethers.getContractFactory("LOOT");
    const loot = await LOOT.deploy();
    const contractObj = await loot.deployed();

    // get contract address
    console.log("LOOT Contract Address =>", contractObj.address);

    await contractObj.addController(owner.address);

    const getOwnerStatus = await contractObj.controllers(owner.address);

    // return the status of Owner
    console.log(`Owner status =>`, getOwnerStatus.toString());
  });

  it("Remove Owner in Controller", async function () {
    [owner] = await ethers.getSigners();

    const LOOT = await ethers.getContractFactory("LOOT");
    const loot = await LOOT.deploy();
    const contractObj = await loot.deployed();

    await contractObj.addController(owner.address);

    await contractObj.removeController(owner.address);

    const getOwnerStatus = await contractObj.controllers(owner.address);
    console.log(`Owner status =>`, getOwnerStatus.toString());
  });

  it("Returns the minted count", async function () {
    [owner] = await ethers.getSigners();

    const LOOT = await ethers.getContractFactory("LOOT");
    const loot = await LOOT.deploy();
    const contractObj = await loot.deployed();

    // add Owner in Controller
    await contractObj.addController(owner.address);

    await contractObj.mint(owner.address, 1, {
      from: owner.address,
    });

    const getMintBalance = await contractObj.balanceOf(owner.address);

    console.log(`the balance of Mint =>`, getMintBalance.toString());
  });

  it("Burn Minted Item", async function () {
    [owner] = await ethers.getSigners();

    const LOOT = await ethers.getContractFactory("LOOT");
    const loot = await LOOT.deploy();
    const contractObj = await loot.deployed();

    // add Owner in Controller
    await contractObj.addController(owner.address);

    // mint Item
    await contractObj.mint(owner.address, 1, {
      from: owner.address,
    });

    await contractObj.balanceOf(owner.address);

    await contractObj.burn(owner.address, 1, {
      from: owner.address,
    });

    const getMintBalance = await contractObj.balanceOf(owner.address);

    console.log(`the balance of Mint =>`, getMintBalance.toString());
  });
});
