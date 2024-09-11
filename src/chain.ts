import { defineChain } from "viem";

export const EDUChainTestnet = defineChain({
  id: 656476,
  name: "Open Campus Codex Sepolia",
  nativeCurrency: { name: "EDU", symbol: "EDU", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://open-campus-codex-sepolia.drpc.org"] },
  },
  blockExplorers: {
    default: {
      name: "EDU Chain Testnet Explorer",
      url: "https://opencampus-codex.blockscout.com/",
    },
  },
});

export const BaseTestnet = defineChain({
  id: 84532,
  name: "Base Sepolia Testnet",
  nativeCurrency: { name: "Ethereum", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://sepolia.base.org"] },
  },
  blockExplorers: {
    default: {
      name: "Base Sepolia Testnet Explorer",
      url: "https://sepolia.basescan.org",
    },
  },
});

export const LiskTestnet = defineChain({
  id: 4202,
  name: "Lisk Sepolia Testnet",
  nativeCurrency: { name: "Ethereum", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.sepolia-api.lisk.com"] },
  },
  blockExplorers: {
    default: {
      name: "Lisk Sepolia Testnet Explorer",
      url: "https://sepolia-blockscout.lisk.com",
    },
  },
});
