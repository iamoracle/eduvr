"use client";

import { createEmptyMediaStream } from "@/utils/stream";
import Peer from "peerjs";
import { useEffect, useRef } from "react";

const useAdminPeer = (sessionId: string) => {
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
    const peer = new Peer();

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
  }, []);

  return { remoteRef };
};

export default useAdminPeer;
