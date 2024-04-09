// scripts/executeMint.js
const { ethers } = require("hardhat");

async function main() {
  // Define the contract addresses
  const multiSigAddress = '0x5d25E4CAE96043cA5F47a940d0B1a303120aD988';
  const erc20Address = '0x6081a4d3e284aE268EB0578910E5D662353d63B1';
  const signer1PrivateKey = 'b166f14e60f246d92275e41f4df08a93fce0e9ff73bb7add136afc22b26d1c02';
  const signer2PrivateKey = '1b77c43537b286618b6a54f6639b1b8c1592f125aa465201682403c3dc1cc213';
  const privateKeys = [signer1PrivateKey, signer2PrivateKey]
  const recipientAddress = '0x84DEFFBdD82d6c1279e03BcdfFE7a27a5635e33d';  // Example recipient
  const mintAmount = '10000000000000';  // Example mint amount

  // Load the contract factories
  const MultiSigExample = await ethers.getContractFactory("MultiSigExample");
  const ERC20Token = await ethers.getContractFactory("MyToken");

  // Attach to the deployed contracts
  const multiSig = MultiSigExample.attach(multiSigAddress);
  const erc20 = ERC20Token.attach(erc20Address);

  // Get signers
  const signer1 = new ethers.Wallet(signer1PrivateKey, ethers.provider);
  const signer2 = new ethers.Wallet(signer2PrivateKey, ethers.provider);

  // Interact with the contracts
  try {
    // Encode the mint function data
    const mintData = erc20.interface.encodeFunctionData('mint', [
      recipientAddress,
      mintAmount
    ]);

    // Get the next nonce value
    const nonce = await multiSig.nonce();

    // Get the transaction hash
    const txHash = ethers.keccak256(ethers.utils.solidityPack(
        ['address', 'uint256', 'bytes', 'uint256'],
        [erc20Address, 0, mintData, nonce]
      ));

    // Collect signatures off-chain
    const signatures = await Promise.all(
      privateKeys.map(async (privateKey) => {
        const wallet = new ethers.Wallet(privateKey);
        const signature = await wallet.signMessage(ethers.utils.arrayify(txHash));
        return signature;
      })
    );

    // Execute the transaction
    const executeTx = await multiSig.executeTransaction(erc20Address, 0, mintData, nonce, signatures);
    console.log("Transaction executed:", executeTx.hash);

    // Increment the nonce
    await multiSig.incrementNonce();
  } catch (error) {
    console.error("Error during mint transaction:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });