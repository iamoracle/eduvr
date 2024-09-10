import { toSvg } from "jdenticon";
import { useEffect, useState } from "react";
import { getRandomPastelColor } from "@/utils/getRandomPastelColor";

interface Props {
    sideBarTrigger: any,
    sideBar: boolean,
}

const Sidebar: React.FC<Props> = ({sideBarTrigger, sideBar}) => {
  const [svgString, setsvgString] = useState<string>("");
  const [backgroundColor, setBackgroundColor] = useState<string>("");

  useEffect(() => {
    const svg = toSvg("2", 50);
    setsvgString(svg);
    setBackgroundColor(getRandomPastelColor());
  }, []);


  return (
    <div
      className={`dark:bg-[#2b2f36] bg-white shadow_class h-screen max-h-screen overflow-hidden absolute top-0 right-0 z-50 ${
        sideBar ? "w-[3.75rem] p-3" : "md:w-[21rem] w-[18rem] p-5"
      }`}
    >
      <div className="mb-4 flex flex-row items-center">
        <svg
          className="text-slate-700 dark:text-slate-300 w-5 h-5 mr-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          style={{ msFilter: "" }}
          fill="currentColor"
          onClick={sideBarTrigger}
        >
          <path d="M13.293 6.293L7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
        </svg>
        <h2 className="text-sm font-medium flex flex-row gap-1 text-slate-700 dark:text-slate-300">
          <span className={`${sideBar ? "hidden" : "block"}`}>Participant</span>
          <span>1</span>
        </h2>
      </div>
      <div className="flex flex-col gap-y-4 flex-wrap items-start pt-2 overflow-y-auto h-[calc(100vh-80px)] max-h-[calc(100vh-80px)]">
        <div className="flex flex-row items-center">
          <div
            className="shadow-2xl w-9 h-9 rounded-xl flex justify-center items-center"
            style={{ background: backgroundColor }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 50 50"
            >
              <path
                fill="#e3e3e3"
                d="M20 15L15 10L20 5L25 10ZM25 10L30 5L35 10L30 15ZM30 35L35 40L30 45L25 40ZM25 40L20 45L15 40L20 35ZM10 25L5 20L10 15L15 20ZM35 20L40 15L45 20L40 25ZM40 25L45 30L40 35L35 30ZM15 30L10 35L5 30L10 25Z"
              />
              <path
                fill="#2e5e8c"
                d="M5 15L5 5L10 5ZM35 5L45 5L45 10ZM45 35L45 45L40 45ZM15 45L5 45L5 40Z"
              />
              <path
                fill="#5991c7"
                d="M15 15L25 15L25 25L15 25ZM21.5 24L24 19L19 19ZM35 15L35 25L25 25L25 15ZM26 21.5L31 24L31 19ZM35 35L25 35L25 25L35 25ZM28.5 26L26 31L31 31ZM15 35L15 25L25 25L25 35ZM24 28.5L19 26L19 31Z"
              />
            </svg>
          </div>
          <p
            className={`text-sm ml-3 flex flex-col ${
              sideBar ? "hidden" : "block"
            }`}
          >
            <span className="text-slate-700 dark:text-slate-300 font-medium">Anonymouns 1</span>
            <span className="text-xs text-slate-400 dark:text-slate-500">Student</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
