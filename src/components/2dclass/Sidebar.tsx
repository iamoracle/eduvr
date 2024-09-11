import { toSvg } from "jdenticon";
import { useEffect, useMemo, useState } from "react";
import { getRandomPastelColor } from "@/utils/getRandomPastelColor";
import parse from "html-react-parser";

import { io } from "socket.io-client";

import {
  createCall,
  createCallParticipant,
  deactivateCall,
  getAvailablePositions,
  getCallParticipants,
  getMyCalls,
  getStats,
} from "@/utils/call";
import { useRouter } from "next/router";

interface Props {
  toggleSideBarState: any;
  sideBarState: boolean;
}

const socket = io("https://eduvr-ggfbgvc3h2beaafc.eastus-01.azurewebsites.net");

console.log(socket);

const Sidebar: React.FC<Props> = ({ toggleSideBarState, sideBarState }) => {
  const router = useRouter();
  const { id } = router.query;

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

  const [participants, setparticipants] = useState([]);
  const [totalparticipants, settotalparticipants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const participants = await getCallParticipants(parsedId);

        const participantCount = participants.length;
        settotalparticipants(participantCount);

        const updatedParticipants = participants.map(
          (participant: any, index: any) => ({
            ...participant,
            svg: toSvg(`${participant.position}`, 25), // Assign SVG, use index or other identifier
            backgroundColor: getRandomPastelColor(), // Assign random pastel color
          })
        );
        setparticipants(updatedParticipants);
      } catch (error) {
        console.error("Failed to fetch participants:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div
      className={`dark:bg-[#2b2f36] bg-white shadow_class h-screen max-h-screen overflow-hidden absolute top-0 right-0 z-50 ${
        sideBarState ? "w-[3.75rem] p-3" : "md:w-[21rem] w-[18rem] p-5"
      }`}
    >
      <div className="mb-4 flex flex-row items-center mt-3">
        <svg
          className="text-slate-700 dark:text-slate-300 w-5 h-5 mr-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          style={{ msFilter: "" }}
          fill="currentColor"
          onClick={toggleSideBarState}
        >
          <path d="M13.293 6.293L7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
        </svg>
        <h2 className="text-sm font-medium flex flex-row gap-1 text-slate-700 dark:text-slate-300">
          <span className={`${sideBarState ? "hidden" : "block"}`}>
            Participant
          </span>
          <span>{totalparticipants}</span>
        </h2>
      </div>
      <div className="flex flex-col gap-y-4 flex-nowrap items-start pt-2 overflow-y-auto h-[calc(100vh-80px)] max-h-[calc(100vh-80px)]">
        {participants.map((data: any, index) => {
          return (
            <div className="flex flex-row items-center w-full" key={index}>
              <div
                className="shadow-2xl w-9 h-9 rounded-xl flex justify-center items-center"
                style={{ background: data.backgroundColor }}
              >
                {parse(data.svg)}
              </div>
              <div className="flex flex-row justify-between flex-1 gap-x-3 items-center">
                <p
                  className={`text-sm flex flex-col ${
                    sideBarState ? "hidden" : "block ml-3"
                  }`}
                >
                  <span className="text-slate-700 dark:text-slate-300 font-medium">
                    Anonymous {data.position}
                  </span>
                </p>
                <p className={`flex flex-row gap-x-2 ${sideBarState ? "hidden" : "block"}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[1.12rem] h-w-[1.12rem] text-slate-400 dark:text-slate-500"
                    viewBox="0 0 24 24"
                    style={{ msFilter: "" }}
                    fill="currentColor"
                  >
                    <path d="M21.707 20.293l-3.388-3.388A7.942 7.942 0 0020 12.021h-2a5.95 5.95 0 01-1.109 3.456l-1.452-1.452c.348-.591.561-1.27.561-2.004v-6C16 3.804 14.215 2 12.021 2c-.07 0-.14.009-.209.025A4.005 4.005 0 008 6.021v.565L3.707 2.293 2.293 3.707l18 18 1.414-1.414zM10 6.021c0-1.103.897-2 2-2a.918.918 0 00.164-.015C13.188 4.08 14 4.956 14 6.021v6c0 .172-.029.335-.071.494L10 8.586V6.021zm-4 6H4c0 4.072 3.06 7.436 7 7.931v2.069h2v-2.07a7.993 7.993 0 002.218-.611l-1.558-1.558a5.979 5.979 0 01-1.66.239c-3.309 0-6-2.692-6-6z"></path>
                    <path d="M8.011 12.132a3.993 3.993 0 003.877 3.877l-3.877-3.877z"></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[1.12rem] h-w-[1.12rem] text-slate-400 dark:text-slate-500"
                    viewBox="0 0 24 24"
                    style={{ msFilter: "" }}
                    fill="currentColor"
                  >
                    <path d="M18 7c0-1.103-.897-2-2-2H6.414L3.707 2.293 2.293 3.707l18 18 1.414-1.414L18 16.586v-2.919L22 17V7l-4 3.333V7zm-2 7.586L8.414 7H16v7.586zM4 19h10.879l-2-2H4V8.121L2.145 6.265A1.977 1.977 0 002 7v10c0 1.103.897 2 2 2z"></path>
                  </svg>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
