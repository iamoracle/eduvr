import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { arbitrum } from "wagmi/chains";
import { EDUChainTestnet } from "./chain";

export const config = getDefaultConfig({
  appName: "EduVR",
  projectId: "d4a6f4edae5c0b3b2352b1e169c92123",
  chains: [
    arbitrum,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? [EDUChainTestnet]
      : []),
  ],
  ssr: true,
});
