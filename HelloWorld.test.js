const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("HelloWorld", function () {
  it("Should return 'Hello, World!' and check if deployed", async function () {
    // Get the ContractFactory and Signers from Hardhat
    const HelloWorld = await ethers.getContractFactory("HelloWorld");
    const [deployer] = await ethers.getSigners();

    // Deploy the contract
    const helloWorld = await HelloWorld.deploy();

    // Call the contract's sayHello function
    const greeting = await helloWorld.sayHello();
    expect(greeting).to.equal("Hello, World!");

    // Check if the contract is deployed
    const isDeployed = await helloWorld.isDeployed();
    expect(isDeployed).to.equal(true);

    // Alternatively, you can also use `helloWorld.deployed()` to get the deployed instance
    // const helloWorldDeployed = await HelloWorld.deployed();
    // const greetingDeployed = await helloWorldDeployed.sayHello();
    // expect(greetingDeployed).to.equal("Hello, World!");
  });
});
