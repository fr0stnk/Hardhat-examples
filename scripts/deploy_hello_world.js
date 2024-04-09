async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const HelloWorld = await ethers.getContractFactory("HelloWorld");
    const helloWorld = await HelloWorld.deploy();

    console.log("HelloWorld contract deployed to:", helloWorld.address); // Log the deployed contract address

    // Additional logging
    const isDeployed = await helloWorld.deployed(); // Check if the contract is deployed
    console.log("Is HelloWorld contract deployed?", isDeployed);

    const greeting = await helloWorld.sayHello(); // Call a function on the deployed contract
    console.log("Greeting from the contract:", greeting);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("An error occurred during the deployment:", error);
        process.exit(1);
    });
