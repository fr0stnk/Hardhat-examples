const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("MultiSigtModule", (m) => {
    // Default values for deployment, these can be overridden via the command line or a configuration file
    const owners = m.getParameter("owners", ["0x...", "0x..."]); // List of owner addresses
    const required = m.getParameter("required", 2); // Number of required confirmations

    const multiSig = m.contract("MultiSig", [owners, required], {
        // Additional deployment options can be added here, such as gas limits or other transaction parameters.
    });

    return { multiSig };
});