contract HelloWorld {
    string private greeting;
    bool private isContractDeployed;

    // Constructor to set the initial greeting and contract deployment status
    constructor() {
        greeting = "Hello, World!";
        isContractDeployed = true;
    }

    // Function to get the greeting message
    function sayHello() public view returns (string memory) {
        return greeting;
    }

    // Function to check if the contract is deployed
    function deployed() public view returns (bool) {
        return isContractDeployed;
    }

    // Function to change the greeting message
    function setGreeting(string memory _greeting) public {
        greeting = _greeting;
    }
}
