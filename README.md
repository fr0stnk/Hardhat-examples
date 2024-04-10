# Hardhat Example Project

This project demonstrates a setup using Hardhat, a development environment to compile, deploy, test, and debug Ethereum software. It includes various smart contracts such as `HelloWorld`, `Lock`, `MultiSigExample`, `MyGovernor`, and `VotingToken`.

## Contracts

- `HelloWorld`: A simple contract that stores a greeting and allows it to be changed.
- `Lock`: A time-locked contract that only allows withdrawals after a certain date.
- `MyGovernor`: A governance contract based on OpenZeppelin's Governor contract.
- `VotingToken`: An ERC20 token that supports voting with additional extensions.
- `MultiSig`: A contract that enables multi-signature transaction approval for increased security and control, requiring multiple signatures from confirmed owners before executing transactions.

## Getting Started

Clone the repository and install dependencies:

```console
git clone <repository-url>
cd hardhat-example
npm install
```

Compile the contracts:

```console
npx hardhat compile
```

Deploy the contracts to the desired network:

```console
npx hardhat run scripts/deploy_hello_world.js --network <network-name>
```

## Scripts

The `scripts` directory contains JavaScript files that are used to deploy and interact with the smart contracts.

## Testing

Run the test suite with:

```console
npx hardhat test
```

## Ignition

The `ignition` directory includes modules and deployment scripts for contract deployment orchestration.

## Configuration

Configure your environment variables in a `.env` file and update the `hardhat.config.js` as needed.

## License

This project is unlicensed and free for anyone to use.## Command History

Below are the commands used throughout the project's lifecycle:

- `npx hardhat init`: Initialize a new Hardhat project.
- `npx hardhat accounts`: List available accounts.
- `npx hardhat compile`: Compile the smart contracts.
- `npx hardhat run <script>`: Run a script to deploy contracts or interact with them.
- `npx hardhat test`: Run the contract tests.
- `npx hardhat node`: Start a local Ethereum node.
- `npx hardhat vars set <key> <value>`: Set an environment variable for the project.
- `npx hardhat size-contracts`: Output the size of the compiled contracts.
- `npx hardhat ignition <command>`: Use Hardhat Ignition for advanced deployment scripting.

## Contract Descriptions

- `HelloWorld.sol`: Demonstrates a basic contract with a greeting variable that can be read and set.
- `Lock.sol`: Implements a locking mechanism that restricts withdrawals to after a certain time.
- `MyGovernor.sol`: An example of a governance contract that interacts with a voting token for proposal voting.
- `VotingToken.sol`: An ERC20 token that includes voting capabilities, used with the MyGovernor contract for governance.
- `MultiSig.sol`: Facilitates a multi-signature wallet that requires multiple confirmations for transactions, enhancing security and control.

### Example of Multisig contract call to Mint function of ERC20

Multi-Signature (MultiSig) Wallets are integral to the Ethereum ecosystem, enhancing security and governance capabilities by requiring multiple approvals before executing any transaction. These wallets are particularly useful for managing complex operations such as executing ERC20 token functions, for example, minting new tokens, which demand a high level of security and consensus among stakeholders.

#### Overview of MultiSig Wallet Operations:

1. **Initiating a Transaction Proposal:** Transactions in a MultiSig typically start with an owner proposing an action through a method `submitTransaction`. For instance, to mint new ERC20 tokens, an owner would prepare and submit a transaction proposal by encoding the mint function along with its intended parameters. This stage sets the foundation for a secure and consensual operation within the blockchain framework.

   ```plaintext
   Function: submitTransaction
   Parameters:
   - destination address (address of the ERC20 token contract)
   - value (typically 0 for token minting calls)
   - data (encoded function, e.g., the mint function and its parameters)
   ```

   The transaction is then logged with a unique ID, facilitating traceability and reference in the confirmation process.

2. **Confirmation by Multiple Owners:**
   The proposal must be confirmed according to predetermined wallet configurations, typically by a minimum number of wallet owners. These owners review and approve the transaction using the `confirmTransaction` function by citing the transaction ID.

   ```plaintext
   Function: confirmTransaction
   Parameters:
   - transactionId (uint): ID of the transaction that requires confirmation.
   ```

   In essence, this step reinforces the security by ensuring multiple validations on the proposed action. After the required number of confirmations is reached, the transaction is automatically executed, reflecting the consensus-driven operation of MultiSig Wallets.

3. **Automated Execution upon Meeting Confirmation Requirements:**
   One of the pivotal features of MultiSigs is the automatic execution of transactions once they receive the requisite number of confirmations. This streamlined feature ensures that actions, like minting tokens, are carried out efficiently without the need for manual intervention once approval consensus is achieved.

## Setting Private Keys for Hardhat Configuration

To securely manage private keys in your Hardhat project, it's recommended to use environment variables rather than hardcoding them in your `hardhat.config.js` file. This approach keeps sensitive information out of your source code.

### Setting up Environment Variables

#### Windows
1. Open the Start menu and search for 'Environment Variables'.
2. Click on 'Edit the system environment variables'.
3. In the System Properties window, click 'Environment Variables'.
4. Click 'New' under the 'System variables' section.
5. Enter `AURORIA_PRIVATE_KEY` and `HOLESKY_PRIVATE_KEY` as the variable names and your respective private keys as the values.

#### macOS/Linux
1. Open your terminal.
2. Edit your shell's profile file (e.g., `~/.bash_profile`, `~/.zshrc`, etc.) with a text editor.
3. Add the following lines to set your environment variables:
   ```
   export AURORIA_PRIVATE_KEY="your_auroria_private_key_here"
   export HOLESKY_PRIVATE_KEY="your_holesky_private_key_here"
   ```
4. Save the file and run `source ~/.bash_profile` (or equivalent) to apply the changes.

### Modifying `hardhat.config.js`

In your `hardhat.config.js`, reference these environment variables as follows:

```javascript
const AURORIA_PRIVATE_KEY = process.env.AURORIA_PRIVATE_KEY;
const HOLESKY_PRIVATE_KEY = process.env.HOLESKY_PRIVATE_KEY;

module.exports = {
  // Configuration details
  networks: {
    auroria: {
      accounts: [AURORIA_PRIVATE_KEY],
      // Other network configurations
    },
    holesky: {
      accounts: [HOLESKY_PRIVATE_KEY],
      // Other network configurations
    },
  },
  // Other configurations
};
```