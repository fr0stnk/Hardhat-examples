// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IERC20 {
    function mint(address to, uint256 amount) external returns (bool);
    function burn(uint256 amount) external returns (bool);
}

contract MultiSig {

    uint constant public MAX_OWNER_COUNT = 50;

    event Confirmation(address indexed sender, uint indexed transactionId);
    event Revocation(address indexed sender, uint indexed transactionId);
    event Submission(uint indexed transactionId);
    event Execution(uint indexed transactionId);
    event ExecutionFailure(uint indexed transactionId);
    event Deposit(address indexed sender, uint value);
    event OwnerAddition(address indexed owner);
    event OwnerRemoval(address indexed owner);
    event RequirementChange(uint required);

    mapping (uint => Transaction) public transactions;
    mapping (uint => mapping (address => bool)) public confirmations;
    mapping (address => bool) public isOwner;
    address[] public owners;
    uint public required;
    uint public transactionCount;

    struct Transaction {
        address destination;
        uint value;
        bytes data;
        bool executed;
    }

    modifier onlyWallet() {
        require(msg.sender == address(this), "Not wallet");
        _;
    }

    modifier ownerDoesNotExist(address owner) {
        require(!isOwner[owner], "Owner exists");
        _;
    }

    modifier ownerExists(address owner) {
        require(isOwner[owner], "Owner doesn't exist");
        _;
    }

    modifier transactionExists(uint transactionId) {
        require(transactions[transactionId].destination != address(0), "No transaction found");
        _;
    }

    modifier confirmed(uint transactionId, address owner) {
        require(confirmations[transactionId][owner], "Transaction not confirmed");
        _;
    }

    modifier notConfirmed(uint transactionId, address owner) {
        require(!confirmations[transactionId][owner], "Transaction already confirmed");
        _;
    }

    modifier notExecuted(uint transactionId) {
        require(!transactions[transactionId].executed, "Transaction already executed");
        _;
    }

    modifier validRequirement(uint ownerCount, uint _required) {
        require(ownerCount <= MAX_OWNER_COUNT
                && _required <= ownerCount
                && _required != 0
                && ownerCount != 0, "Invalid requirements");
        _;
    }

    receive() external payable {
        if (msg.value > 0)
            emit Deposit(msg.sender, msg.value);
    }

    constructor(address[] memory _owners, uint _required) validRequirement(_owners.length, _required) {
        for (uint i = 0; i < _owners.length; i++) {
            require(!isOwner[_owners[i]] && _owners[i] != address(0), "Invalid owner");
            isOwner[_owners[i]] = true;
        }
        owners = _owners;
        required = _required;
    }

    function addOwner(address owner)
        public
        onlyWallet
        ownerDoesNotExist(owner)
        validRequirement(owners.length + 1, required)
    {
        isOwner[owner] = true;
        owners.push(owner);
        emit OwnerAddition(owner);
    }

    function removeOwner(address owner)
        public
        onlyWallet
        ownerExists(owner)
    {
        isOwner[owner] = false;
        uint ownerIndex;
        for (uint i = 0; i < owners.length; i++){
            if (owners[i] == owner) {
                ownerIndex = i;
                break;
            }
        }
        owners[ownerIndex] = owners[owners.length - 1];
        owners.pop();
        if (required > owners.length)
            changeRequirement(owners.length);
        emit OwnerRemoval(owner);
    }

    function replaceOwner(address owner, address newOwner)
        public
        onlyWallet
        ownerExists(owner)
        ownerDoesNotExist(newOwner)
    {
        for (uint i = 0; i < owners.length; i++)
            if (owners[i] == owner) {
                owners[i] = newOwner;
                break;
            }
        isOwner[owner] = false;
        isOwner[newOwner] = true;
        emit OwnerRemoval(owner);
        emit OwnerAddition(newOwner);
    }

    function changeRequirement(uint _required)
        public
        onlyWallet
        validRequirement(owners.length, _required)
    {
        required = _required;
        emit RequirementChange(_required);
    }

    function submitTransaction(address destination, uint value, bytes memory data)
        public
        returns (uint transactionId)
    {
        transactionId = addTransaction(destination, value, data);
        confirmTransaction(transactionId);
        return transactionId;
    }

    function confirmTransaction(uint transactionId)
        public
        ownerExists(msg.sender)
        transactionExists(transactionId)
        notConfirmed(transactionId, msg.sender)
    {
        confirmations[transactionId][msg.sender] = true;
        emit Confirmation(msg.sender, transactionId);
        executeTransaction(transactionId);
    }

    function executeTransaction(uint transactionId)
        public
        confirmed(transactionId, msg.sender)
        notExecuted(transactionId)
    {
        if (isConfirmed(transactionId)) {
            transactions[transactionId].executed = true;
            (bool success, ) = transactions[transactionId].destination.call{value: transactions[transactionId].value}(transactions[transactionId].data);
            if (success)
                emit Execution(transactionId);
            else {
                emit ExecutionFailure(transactionId);
                transactions[transactionId].executed = false;
            }
        }
    }

    function isConfirmed(uint transactionId)
        public
        view
        returns (bool)
    {
        uint count = 0;
        for (uint i = 0; i < owners.length; i++) {
            if (confirmations[transactionId][owners[i]]) {
                count++;
            }
            if (count == required) {
                return true;
            }
        }
        return false;
    }

    function addTransaction(address destination, uint value, bytes memory data)
        internal
        returns (uint transactionId)
    {
        transactionId = transactionCount;
        transactions[transactionId] = Transaction({
            destination: destination,
            value: value,
            data: data,
            executed: false
        });
        transactionCount++;
        emit Submission(transactionId);
        return transactionId;
    }
}