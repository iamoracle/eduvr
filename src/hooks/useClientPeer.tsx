"use client";

import { createEmptyMediaStream } from "@/utils/stream";
import Peer from "peerjs";
import { useEffect, useRef } from "react";

const useAdminPeer = (
  sessionId: string,
  callObject: any,
  isLoading: boolean
) => {
  const remoteRef = useRef<any>(null);
  const currentPeer = useRef<any>(null);

  const call = (remotePeerId: string) => {
    console.log("Calling " + remotePeerId);

    const call = currentPeer.current.call(
      remotePeerId,
      createEmptyMediaStream()
    );

    call.on("stream", (remoteStream: any) => {
      console.log("Received stream");
      remoteRef.current.srcObject = remoteStream;

      remoteRef.current.onloadedmetadata = () => {
        remoteRef.current.play();
      };
    });

    call.on("close", () => {
      console.log("Call ended");
    });

    call.on("error", (err: any) => {
      console.error("Call error:", err);
    });
  };

  useEffect(() => {
    if (!sessionId || !callObject?._id || isLoading) return;

    const peer = new Peer("", {
      config: {
        iceServers: {
          urls: [
            "stun:stun.cloudflare.com:3478",
            "turn:turn.cloudflare.com:3478?transport=udp",
            "turn:turn.cloudflare.com:3478?transport=tcp",
            "turns:turn.cloudflare.com:5349?transport=tcp",
          ],
          username:
            "31ac8a36e3e7988ab03c283323a51c3ce11de9cb302c1caa79b582b6cd8de980",
          credential:
            "f3b7490d92640855689faa349b9f472e65cb2a0289c3e271386698ae17a0aaac",
        },
      },
    });

    peer.on("open", (id) => {
      console.log("My session ID: " + id);
      call(sessionId);
    });

    peer.on("connection", () => {
      console.log("Connected to peer server");
    });

    peer.on("error", (err) => {
      console.error("Peer error:", err);
    });

    currentPeer.current = peer;
  }, [sessionId, callObject, isLoading]);

  return { remoteRef };
};

export default useAdminPeer;
