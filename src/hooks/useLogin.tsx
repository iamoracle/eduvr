import axios from "../network/axios";
import useError from "./useError";
import useMessage from "./useMessage";
import { signMessage } from "@wagmi/core";
import { config } from "../wagmi";
import { useAccount } from "wagmi";
import { useCallback } from "react";
import useLoading from "./useLoading";
import { setTokens } from "@/utils/token";

const useLogin = () => {
  const { message, setMessage, clearMessage } = useMessage();
  const { error, hasError, clearError } = useError();
  const { address } = useAccount();
  const { isLoading, startLoading, stopLoading } = useLoading();

  const login = useCallback(async () => {
    startLoading();

    try {
      clearError();
      clearMessage();
      const timestamp = Date.now() + 300 * 1000;
      const signature = await signMessage(config, {
        message: `${address?.toLowerCase()}:${timestamp}`,
      });
      const req = await axios.post("/auth/login", {
        signature,
        timestamp,
        walletAddress: address?.toLowerCase(),
      });
      const { accessToken, refreshToken } = req.data;
      setTokens(accessToken, refreshToken);
      setMessage("login successfully");
      stopLoading();
      return true;
    } catch (error: any) {
      setMessage(error.response?.data.message);
      hasError();
    }
    stopLoading();
  }, [address]);

  return { error, message, login, isLoading };
};

export default useLogin;
