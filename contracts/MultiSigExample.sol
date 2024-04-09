// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MultiSigExample {
    event ExecuteTransaction(address indexed sender, address indexed target, uint256 value, bytes data);
    event OwnerChange(address indexed oldOwner, address indexed newOwner);
    event Deposit(address indexed sender, uint256 amount);

    address[3] public owners;
    uint256 constant public SIGNATURES_REQUIRED = 2;
    uint256 public nonce;

    mapping(address => bool) public isOwner;
    mapping(bytes32 => uint256) public signatureCount;
    mapping(bytes32 => mapping(address => bool)) public signatures;

    modifier onlyOwner() {
        require(isOwner[msg.sender], "Not an owner");
        _;
    }

    constructor(address[3] memory _owners) {
        require(_owners.length == 3, "Invalid number of owners");
        for (uint256 i = 0; i < _owners.length; i++) {
            require(_owners[i] != address(0), "Invalid owner address");
            require(!isOwner[_owners[i]], "Owner not unique");
            isOwner[_owners[i]] = true;
            owners[i] = _owners[i];
        }
    }

    function executeTransaction(address target, uint256 value, bytes memory data, uint256 _nonce) public onlyOwner returns (bytes memory) {
        require(target != address(0), "Invalid target address");
        require(_nonce == nonce, "Invalid nonce");

        bytes32 txHash = keccak256(abi.encodePacked(target, value, data, _nonce));
        require(!signatures[txHash][msg.sender], "Transaction already signed");

        signatures[txHash][msg.sender] = true;
        signatureCount[txHash] += 1;

        if (signatureCount[txHash] >= SIGNATURES_REQUIRED) {
            require(address(this).balance >= value, "Insufficient contract balance");

            nonce++; // Increment the nonce after executing the transaction

            (bool success, bytes memory returnData) = target.call{value: value}(data);
            require(success, "Transaction execution failed");

            emit ExecuteTransaction(msg.sender, target, value, data);

            // Reset the signature count and signatures for this transaction hash
            signatureCount[txHash] = 0;
            for (uint i = 0; i < owners.length; i++) {
                delete signatures[txHash][owners[i]];
            }

            return returnData;
        }

        return new bytes(0);
    }

    function addSignature(bytes32 txHash) external onlyOwner {
        require(!signatures[txHash][msg.sender], "Transaction already signed");

        signatures[txHash][msg.sender] = true;
        signatureCount[txHash] += 1;

        if (signatureCount[txHash] >= SIGNATURES_REQUIRED) {
            signatureCount[txHash] = 0;
            for (uint i = 0; i < owners.length; i++) {
                delete signatures[txHash][owners[i]];
            }
        }
    }

    receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }
}