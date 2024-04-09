// VotingTokenModule.js
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("VotingTokenModule", (m) => {
    const tokenName = m.getParameter("tokenName", "VotingToken"); // Default token name
    const tokenSymbol = m.getParameter("tokenSymbol", "VTK"); // Default token symbol
    const tokenTotalSupply = m.getParameter("tokenTotalSupply", "1000000000000000000000000"); // Default token total supply (1 million tokens with 18 decimals)

    const votingToken = m.contract("VotingToken", [tokenName, tokenSymbol, tokenTotalSupply], {
        // You can include additional deployment options if needed
    });

    return { votingToken };
});
