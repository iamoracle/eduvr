import { useAccount } from "wagmi";
import axios from "../network/axios";
import useError from "./useError";
import useMessage from "./useMessage";
import { signMessage } from "@wagmi/core";
import { config } from "../wagmi";
import { useCallback } from "react";
import { getBalance } from "./../utils/balance";
import mintPassport from "@/utils/passport";
import useLoading from "./useLoading";

const useSignup = () => {
  const { message, setMessage, clearMessage } = useMessage();
  const { error, hasError, clearError } = useError();
  const { address } = useAccount();
  const { startLoading, isLoading, stopLoading } = useLoading();

  const hasMintedPassport = useCallback(async (): Promise<boolean> => {
    if (!address) return false;

    console.log(await getBalance(address));

    const balance: number = (await getBalance(address)) as number;

    if (balance > 0) {
      return true;
    }

    return false;
  }, [address]);

  const signup = async () => {
    startLoading();
    try {
      clearError();
      clearMessage();

      if (!(await hasMintedPassport())) {
        try {
          await mintPassport();
        } catch (error) {
          console.log(error);
          hasError();
          setMessage("error occurred while minting passport");
        }
      }

      const timestamp = Date.now() + 300 * 1000;
      const signature = await signMessage(config, {
        message: `${address?.toLowerCase()}:${timestamp}`,
      });
      const req = await axios.post("/auth/signup", {
        walletAddress: address?.toLowerCase(),
        signature,
        timestamp,
      });
      setMessage(req.data.message);
      stopLoading();
      return true;
    } catch (error: any) {
      setMessage(error.response.data.message);
      hasError();
    }
    stopLoading();
  };

  return { error, message, signup, isLoading };
};

export default useSignup;
