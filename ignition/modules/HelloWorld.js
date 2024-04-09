// Author: @fr0stnk
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("HelloWorldModule", (m) => {
  const greeting = m.getParameter("greeting", "Hello, World!");

  const helloWorld = m.contract("HelloWorld", [], {
    args: [],
  });

  return { helloWorld };
});
