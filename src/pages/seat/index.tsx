"use client";

import Link from "next/link";

import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";

import { Loader2 } from "lucide-react";

import {
  createCall,
  createCallParticipant,
  deactivateCall,
  getAvailablePositions,
  getCallParticipants,
  getMyCalls,
  getStats,
} from "@/utils/call";

import { promises } from "dns";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import useLoading from "@/hooks/useLoading";

interface Props {
  callId: string;
}

const PickSeat: React.FC<Props> = ({ callId }) => {
  const [availableSeats, setAvailableSeats] = useState<Array<number>>([]);
  const [pickedSeat, setPickedSeat] = useState<number | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);

  const { isLoading, stopLoading, startLoading } = useLoading();

  const chairs = useMemo(() => {
    return Array.from({ length: 32 }, (_, index) => index);
  }, []);

  const avatars = [
    { src: "/avatar/default-0.png", id: 1 },
    { src: "/avatar/default-1.png", id: 2 }
  ];

  useEffect(() => {
    const fetchAvailableSeats = async () => {
      try {
        const seats = await getAvailablePositions(callId);
        setAvailableSeats(seats?.availablePositions);
      } catch (error) {
        console.error("Error fetching available seats:", error);
      }
    };

    fetchAvailableSeats();
  }, [callId]);

  const handleSubmit = async () => {
    startLoading();
    if (typeof selectedAvatar !== "number" || typeof pickedSeat !== "number") {
      toast("Error", {
        description: "Select Seat and Avatar",
      });
      stopLoading();
      return;
    }
    try {
      await createCallParticipant({
        avatar: selectedAvatar,
        callId,
        position: pickedSeat,
      });

      const seatsData = localStorage.getItem("seats");
      const seats = seatsData ? JSON.parse(seatsData) : {};

      seats[callId] = {
        avatar: selectedAvatar,
        position: pickedSeat,
      };

      localStorage.setItem("seats", JSON.stringify(seats));
      window.location.reload();
      stopLoading();
    } catch (error: any) {
      toast("Error", {
        description: error?.response?.data?.message,
      });
      stopLoading();
    }
  };

  const renderChairs = useMemo(() => {
    return chairs.map((index) => {
      const isAvailable = availableSeats.includes(index);
      const isPicked = index === pickedSeat;
  
      return (
        <div
          key={index}
          className={`w-7 h-7 border rounded-sm flex items-center justify-center hover:opacity-40 ${
            isAvailable
              ? isPicked
                ? "available_chair picked_chair"
                : "available_chair_success"
              : "chosen_chair"
          }`}
          onClick={() => setPickedSeat(index)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            viewBox="0 0 24 24"
            style={{ msFilter: "" }}
            fill="currentColor"
          >
            <path d="M19 13V4c0-1.103-.897-2-2-2H7c-1.103 0-2 .897-2 2v9a1 1 0 00-1 1v8h2v-5h12v5h2v-8a1 1 0 00-1-1zm-2-9v9h-2V4h2zm-4 0v9h-2V4h2zM7 4h2v9H7V4z"></path>
          </svg>
        </div>
      );
    });
  }, [availableSeats, pickedSeat]); 

  return (
    <>
      <div>
        <div className="cr_container flex flex-col">
          <div className="cr_child circle-red"></div>
          <div className="cr_child circle-blue"></div>
        </div>
      </div>
      <div className="w-full h-screen min-h-screen flex flex-col items-center justify-center overflow-hidden _Container p-6">
        <div className="flex flex-col md:flex-row justify-center gap-y-6 md:gap-y-0 gap-x-8 w-full py-20">
          <div className="pr-10 max-w-sm">
            <h2 className="text-4xl font-bold">Select a seat and Avatar</h2>
            <p className="mt-4 text-base">
              Select an available seat to fully immerse yourself in the class
              experience.
            </p>
            <div className="w-full flex flex-col mt-4">
              <p className="mb-2 text-sm font-bold">Select Avatar</p>
              <div className="flex flex-row gap-2">
                {avatars.map(({ src, id }) => (
                  <div
                    key={id}
                    className="p-1 bg-white shadow-xl rounded-md relative"
                  >
                    <Image
                      src={src}
                      width={300}
                      height={200}
                      className="w-[60px] rounded-md hover:opacity-30 transition-all"
                      alt="avatar"
                      onClick={() => setSelectedAvatar(id)}
                    />
                    <div
                      className={`w-full h-full bg-blue-200/70 absolute top-0 left-0 rounded-md ${selectedAvatar === id ? '' : 'hidden'}`}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4">
              {isLoading ? (
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) 
              : (<Button onClick={handleSubmit}>Join ClassRoom</Button>) }
            </div>
          </div>
          <div className="max-w-sm flex-1">
            <div className="flex">
              <div className="grid grid-cols-5 mt-5 gap-3 ">{renderChairs}</div>
            </div>
          </div>
        </div>
        <Toaster />
      </div>
    </>
  );
};

export default PickSeat;
