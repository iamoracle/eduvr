import { readContract } from "@wagmi/core";
import abi from "./../abi/passport.json";
import { config } from "../wagmi";

export const getBalance = async (address: string): Promise<any> => {
  console.log(process.env.NEXT_PUBLIC_PASSPORT_ADDRESS);
  const result = readContract(config, {
    abi,
    address: process.env.NEXT_PUBLIC_PASSPORT_ADDRESS as `0x${string}`,
    functionName: "balanceOf",
    args: [address],
  });

  return result;
};
