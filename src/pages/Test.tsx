import { useEffect } from "react";
import useLogin from "@/hooks/useLogin";
import { useAccount } from "wagmi";
import useSignup from "@/hooks/useSignup";
import {
  createCall,
  createCallParticipant,
  deactivateCall,
  getAvailablePositions,
  getCallParticipants,
  getMyCalls,
  getStats,
} from "@/utils/call";
import AuthMiddleware from "@/middlewares/AuthMiddleware";

const Test = () => {
  const { login } = useLogin();
  const { signup, message, error } = useSignup();

  console.log(message, error);

  const { address } = useAccount();
  useEffect(() => {
    if (!address) return;
    // login();
  }, [address]);
  return (
    <AuthMiddleware>
      address && (
      <>
        <button onClick={createCall}>Create call</button>
        <button onClick={signup}>Sign up</button>
        <button
          onClick={() => {
            createCallParticipant({
              avatar: 1,
              callId: "GVT-Qzb-cr7M",
              position: 2,
            });
          }}
        >
          Join Call
        </button>
        <button onClick={getMyCalls}>Get my Call</button>
        <button
          onClick={() => {
            getAvailablePositions("GVT-Qzb-cr7M");
          }}
        >
          Get my available positions
        </button>
        <button
          onClick={() => {
            getStats();
          }}
        >
          Get Stats
        </button>

        <button
          onClick={() => {
            deactivateCall("GVT-Qzb-cr7M");
          }}
        >
          Deactivate Call
        </button>

        <button
          onClick={() => {
            getCallParticipants("GVT-Qzb-cr7M");
          }}
        >
          Get Call Participants
        </button>
      </>
      )
    </AuthMiddleware>
  );
};

export default Test;
