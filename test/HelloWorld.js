const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("HelloWorld", function () {
  async function deployHelloWorldFixture() {
    const HelloWorld = await ethers.getContractFactory("HelloWorld");
    const helloWorld = await HelloWorld.deploy();

    return { helloWorld };
  }

  describe("Deployment", function () {
    it("Should set the initial greeting", async function () {
      const { helloWorld } = await loadFixture(deployHelloWorldFixture);

      expect(await helloWorld.sayHello()).to.equal("Hello, World!");
    });

    it("Should indicate that the contract is deployed", async function () {
      const { helloWorld } = await loadFixture(deployHelloWorldFixture);

      expect(await helloWorld.deployed()).to.equal(true);
    });
  });

  describe("Functionality", function () {
    it("Should return the greeting message", async function () {
      const { helloWorld } = await loadFixture(deployHelloWorldFixture);

      expect(await helloWorld.sayHello()).to.equal("Hello, World!");
    });

    it("Should indicate that the contract is deployed", async function () {
      const { helloWorld } = await loadFixture(deployHelloWorldFixture);

      expect(await helloWorld.deployed()).to.equal(true);
    });
  });
});
