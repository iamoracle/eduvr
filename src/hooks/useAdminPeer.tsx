"use client";

import { createEmptyMediaStream } from "@/utils/stream";
import Peer from "peerjs";
import { useCallback, useEffect, useRef, useState } from "react";

const useAdminPeer = (sessionId: string) => {
  const localRef = useRef<any>(null);
  

  const [callStates, setCallStates] = useState<any>([]);
  const [stream, setStream] = useState<any>(
    typeof window !== "undefined" ? createEmptyMediaStream() : null
  );

  const getStream = useCallback(() => {
    return stream;
  }, [stream]);

  useEffect(() => {
    console.log("my stream" + sessionId);
    if (!sessionId) return;

    const peer = new Peer(sessionId, {
      config: {
        iceServers: [
          {
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
        ],
      },
    });

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

      _callStates.forEach((callState: any, _: any) => {
        _callStates.peerConnection.getSenders().forEach((sender: any) => {
          if (
            sender.track.kind === "audio" &&
            _stream.getAudioTracks().length > 0
          ) {
            sender.replaceTrack(_stream.getAudioTracks()[0]);
          }
          if (
            sender.track.kind === "video" &&
            _stream.getVideoTracks().length > 0
          ) {
            sender.replaceTrack(_stream.getVideoTracks()[0]);
          }
        });
      });
    });

    peer.on("connection", (connection) => {
      console.log("Connected:", connection);
    });

    peer.on("error", (err) => {
      console.error("Peer error:", err);
    });
  }, [sessionId]);

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
