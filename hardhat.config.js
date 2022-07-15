require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.0",
        settings: {
          optimizer: {
            enabled: true,
          },
        },
      },
      {
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: true,
          },
        },
      },
      {
        version: "0.7.5",
        settings: {
          optimizer: {
            enabled: true,
          },
        },
      },
    ],
  },
  networks: {
    testnet: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      chainId: 43113,
      accounts: [],
    },
    mainnet: {
      url: "https://api.avax.network/ext/bc/C/rpc",
      chainId: 43114,
      accounts: [
        "90b888ae264e10c0e6ae31de9c5790d0afa70b1fa989baeb21beab213acb80e7",
      ],
    },
    rinkby: {
      url: "https://rinkeby.infura.io/v3/49598f1218914947b5f0a7a1d9aac855s",
      chainId: 4,
      accounts: [],
    },
    localhost: {
      url: "http://localhost:8545",
      chainId: 31337,
      accounts: [],
    },
  },
  gasReporter: {
    enabled: false,
    currency: "USD",
  },
};
