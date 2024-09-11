"use client";

import { createEmptyMediaStream } from "@/utils/stream";
import Peer from "peerjs";
import { useCallback, useEffect, useRef, useState } from "react";

const useAdminPeer = () => {
  const localRef = useRef<any>(null);

  const [callStates, setCallStates] = useState<any>([]);
  const [stream, setStream] = useState<any>(
    typeof window !== "undefined" ? createEmptyMediaStream() : null
  );

  console.log(stream);

  const getStream = useCallback(() => {
    return stream;
  }, [stream]);

  useEffect(() => {
    const peer = new Peer("sessionIdhhh");

    peer.on("open", (id: string) => {
      console.log("My session ID is " + id);
    });

    peer.on("call", (call: any) => {
      console.log("My call is " + call.peer.id);
      const _callStates = callStates;
      _callStates.push(call);
      setCallStates(_callStates);
      const _stream = getStream();
      call.answer(_stream);
    });

    peer.on("connection", (connection) => {
      console.log("Connected:", connection);
    });

    peer.on("error", (err) => {
      console.error("Peer error:", err);
    });
  }, []);

  const shareScreen = useCallback(() => {
    navigator.mediaDevices
      .getDisplayMedia({ video: true, audio: true })
      .then((localStream) => {
        localRef.current.srcObject = localStream;

        localRef.current.onloadedmetadata = () => {
          localRef.current.play();
        };

        setStream(localStream);

        callStates.forEach((callState: any, _: any) => {
          callState.peerConnection.getSenders().forEach((sender: any) => {
            if (
              sender.track.kind === "audio" &&
              localStream.getAudioTracks().length > 0
            ) {
              sender.replaceTrack(localStream.getAudioTracks()[0]);
            }
            if (
              sender.track.kind === "video" &&
              localStream.getVideoTracks().length > 0
            ) {
              sender.replaceTrack(localStream.getVideoTracks()[0]);
            }
          });
        });
      });
  }, [setStream]);

  return { getStream, shareScreen, localRef };
};

export default useAdminPeer;
