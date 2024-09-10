import { useEffect, useRef } from "react";
import Peer from "peerjs";
import { createEmptyMediaStream } from "@/utils/stream";

export const StudentBoard = ({ sessionId }) => {
  const remoteRef = useRef(null);
  const currentPeer = useRef(null);

  const call = (remotePeerId) => {
    console.log("Calling " + remotePeerId);

    const call = currentPeer.current.call(
      remotePeerId,
      createEmptyMediaStream()
    );

    call.on("stream", (remoteStream) => {
      console.log("Received stream");
      remoteRef.current.srcObject = remoteStream;

      remoteRef.current.onloadedmetadata = () => {
        remoteRef.current.play();
      };
    });

    call.on("close", () => {
      console.log("Call ended");
    });

    call.on("error", (err) => {
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

  return (
    <div className="w-[1700px] h-[415px] flex flex-row relative overflow-y-auto bg-slate-900">
      <video
        ref={remoteRef}
        src="/videos/intro.MOV"
        className="w-full h-full object-cover"
        controls
      ></video>
    </div>
  );
};
