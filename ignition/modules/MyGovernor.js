// mygovernor.js
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("MyGovernorModule", (m) => {
    // Assuming the IVotes token address is a parameter that can be passed to the module
    const tokenAddress = m.getParameter("tokenAddress", "0xA87A8660CB02836e26c4CFB000acf4E883E2d131"); // Default token address as example

    const myGovernor = m.contract("MyGovernor", [tokenAddress], {
        // Additional deployment options can be specified if needed
    });

    return { myGovernor };
});
