require("@nomicfoundation/hardhat-toolbox");
require('hardhat-contract-sizer');

// Ensure that you have these environment variables set in your system
const AURORIA_PRIVATE_KEY = process.env.AURORIA_PRIVATE_KEY;
const HOLESKY_PRIVATE_KEY = process.env.HOLESKY_PRIVATE_KEY;

module.exports = {
  solidity: "0.8.24",
  networks: {
    auroria: {
      url: "https://auroria.rpc.stratisevm.com",
      chainId: 205205,
      accounts: [AURORIA_PRIVATE_KEY],
    },
    holesky: {
      url: "https://ethereum-holesky.publicnode.com",
      chainId: 17000,
      accounts: [HOLESKY_PRIVATE_KEY],
    },
  }
};

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});
