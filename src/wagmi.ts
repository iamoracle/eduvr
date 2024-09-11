import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { BaseTestnet, EDUChainTestnet, LiskTestnet } from "./chain";

export const config = getDefaultConfig({
  appName: "EduVR",
  projectId: "d4a6f4edae5c0b3b2352b1e169c92123",
  chains: [BaseTestnet, LiskTestnet, EDUChainTestnet],
  ssr: true,
});
