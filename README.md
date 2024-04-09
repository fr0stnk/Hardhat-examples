# Hardhat Example Project

This project demonstrates a setup using Hardhat, a development environment to compile, deploy, test, and debug Ethereum software. It includes various smart contracts such as `HelloWorld`, `Lock`, `MultiSigExample`, `MyGovernor`, and `VotingToken`.

## Contracts

- `HelloWorld`: A simple contract that stores a greeting and allows it to be changed.
- `Lock`: A time-locked contract that only allows withdrawals after a certain date.
- `MultiSigExample`: A contract to demonstrate multi-signature wallet transactions.
- `MyGovernor`: A governance contract based on OpenZeppelin's Governor contract.
- `VotingToken`: An ERC20 token that supports voting with additional extensions.

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
- `MultiSigExample.sol`: Facilitates a multi-signature wallet that requires multiple confirmations for transactions.
- `MyGovernor.sol`: An example of a governance contract that interacts with a voting token for proposal voting.
- `VotingToken.sol`: An ERC20 token that includes voting capabilities, used with the MyGovernor contract for governance.