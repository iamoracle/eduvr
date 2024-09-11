import { toSvg } from "jdenticon";
import { useEffect, useMemo, useState } from "react";
import { getRandomPastelColor } from "@/utils/getRandomPastelColor";
import parse from "html-react-parser";

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

        const updatedParticipants = participants.map((participant:any, index:any) => ({
          ...participant,
          svg: toSvg(`${participant.position}`, 25), // Assign SVG, use index or other identifier
          backgroundColor: getRandomPastelColor() // Assign random pastel color
        }));
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
      <div className="mb-4 flex flex-row items-center">
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
      <div className="flex flex-col gap-y-4 flex-wrap items-start pt-2 overflow-y-auto h-[calc(100vh-80px)] max-h-[calc(100vh-80px)]">
        {participants.map((data : any, index) => {
          return (
            <div className="flex flex-row items-center" key={index}>
              <div
                className="shadow-2xl w-9 h-9 rounded-xl flex justify-center items-center"
                style={{ background: data.backgroundColor }}
              >
                {parse(data.svg)}
              </div>
              <p
                className={`text-sm ml-3 flex flex-col ${
                  sideBarState ? "hidden" : "block"
                }`}
              >
                <span className="text-slate-700 dark:text-slate-300 font-medium">
                  Anonymouns {data.position}
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  Student
                </span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
