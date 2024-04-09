const { ethers } = require("hardhat");

async function main() {
  // Load the contract ABI and address
  const HelloWorld = await ethers.getContractFactory("HelloWorld");
  const helloWorldAddress = "0x3EB3105793032364Cd47514685CA6cEe6c5187Cb"; // Replace with the actual contract address

  // Connect to the deployed contract
  const helloWorld = HelloWorld.attach(helloWorldAddress);

  try {
    // Call the setGreeting function and get the transaction hash
    const transaction = await helloWorld.setGreeting("Hello, Hardhat!");
    const transactionHash = transaction.hash;

    console.log("Transaction hash:", transactionHash);
  } catch (error) {
    console.error("Error:", error.message);
    // Check if the error object has a reason property
    if (error.reason) {
      console.log("Revert reason:", error.reason);
    } else {
      console.log("No revert reason provided.");
    }
  }
}

// Execute the main function
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
