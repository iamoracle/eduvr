import React, { useMemo } from "react";
import MaleCharacter from "./Male";
import FemaleCharacter from "./Female";
import Character from "@/pages/class/data/Participant.json";
import {
  createCall,
  createCallParticipant,
  deactivateCall,
  getAvailablePositions,
  getCallParticipants,
  getMyCalls,
  getStats,
} from "@/utils/call";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useLoading from "@/hooks/useLoading";

export const Students = () => {
  const positions = [
    [-3.2, -1.91, 0.55],
    [-1.6, -1.91, 0.55],
    [-0.04, -1.91, 0.55],
    [1.6, -1.91, 0.55],
    [3.2, -1.91, 0.55],

    [-3.2, -1.91, 2.25],
    [-1.6, -1.91, 2.25],
    [-0.04, -1.91, 2.25],
    [1.6, -1.91, 2.25],
    [3.2, -1.91, 2.25],

    [-3.2, -1.91, 4],
    [-1.6, -1.91, 4],
    [-0.04, -1.91, 4],
    [1.6, -1.91, 4],
    [3.2, -1.91, 4],

    [-3.2, -1.91, 5],
    [-1.6, -1.91, 5],
    [-0.04, -1.91, 5],
    [1.6, -1.91, 5],
    [3.2, -1.91, 5],

    [-3.2, -1.91, 6],
    [-1.6, -1.91, 6],
    [-0.04, -1.91, 6],
    [1.6, -1.91, 6],
    [3.2, -1.91, 6],
  ];

  const positionsfemale = [
    [-3.2, -1.75, 0.55],
    [-1.6, -1.75, 0.55],
    [-0.04, -1.75, 0.55],
    [1.6, -1.75, 0.55],
    [3.2, -1.75, 0.55],

    [-3.2, -1.75, 2.25],
    [-1.6, -1.75, 2.25],
    [-0.04, -1.75, 2.25],
    [1.6, -1.75, 2.25],
    [3.2, -1.75, 2.25],

    [-3.2, -1.75, 4],
    [-1.6, -1.75, 4],
    [-0.04, -1.75, 4],
    [1.6, -1.75, 4],
    [3.2, -1.75, 4],

    [-3.2, -1.75, 5],
    [-1.6, -1.75, 5],
    [-0.04, -1.75, 5],
    [1.6, -1.75, 5],
    [3.2, -1.75, 5],

    [-3.2, -1.75, 6],
    [-1.6, -1.75, 6],
    [-0.04, -1.75, 6],
    [1.6, -1.75, 6],
    [3.2, -1.75, 6],
  ];

  const router = useRouter();
  const { id } = router.query;

  const { isLoading, stopLoading } = useLoading(true);

  const parsedId = useMemo((): string => {
    if (!id) return "";

    let _id: string;

    if (typeof id === "object") {
      _id = id[0];
    } else {
      _id = id;
    }

    return _id;
  }, [id]);

  const [seatingPosition, setSeatingPosition] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const participants = await getCallParticipants(parsedId);
        setSeatingPosition(participants);
      } catch (error) {
        console.error("Failed to fetch participants:", error);
      }
    };
    fetchData();

    const intervalId = setInterval(fetchData, 1000);

    return () => clearInterval(intervalId);
  }, [parsedId]);

  const cachedComponents = useMemo(() => {
    return {
      male: <MaleCharacter />,
      female: <FemaleCharacter />,
    };
  }, []);

  return (
    <>
      {seatingPosition.map((data: any, index) => {
        const characterPosition =
          data.avatar === "1"
            ? positions[data.position]
            : data.avatar === "2"
            ? positionsfemale[data.position]
            : [0, 0, 0];

        const componentToRender =
          data.avatar === "1"
            ? cachedComponents.male
            : data.avatar === "2"
            ? cachedComponents.female
            : null;

        return componentToRender ? (
          <React.Fragment key={index}>
            {React.cloneElement(componentToRender, {
              position: characterPosition,
              rotation: [0, Math.PI, 0],
            })}
          </React.Fragment>
        ) : (
          <React.Fragment key={index}>null</React.Fragment>
        );
      })}
    </>
  );
};
