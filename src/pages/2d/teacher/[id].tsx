import ClassLayout from "@/components/2dclass/ClassLayout";
import { Navbar } from "@/components/class/Nav";
import { useCallback, useState } from "react";
import Sidebar from "@/components/2dclass/Sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RocketIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import useAdminPeer from "@/hooks/useAdminPeer";
import useCallRouter from "@/hooks/useCallRouter";
import { useRouter } from "next/router";
import Preloader from "@/components/Preloader";

const Index = () => {
  const [sideBarState, setSideBarState] = useState<boolean>(false);

  const router = useRouter();
  const { id } = router.query;

  const { call, isLoading, isTeacher } = useCallRouter(id);

  const { shareScreen, localRef } = useAdminPeer(call.session ?? "");

  const toggleSideBarState = useCallback(() => {
    setSideBarState((state) => !state);
  }, []);

  console.log(isLoading, call?._id);

  if (isLoading || !call?._id) {
    return <Preloader />;
  }

  return (
    isTeacher && (
      <div className="bg-[#f4f6f9] dark:bg-[#1c1f24] w-full min-h-screen flex flex-col">
        <div className="cr_container flex flex-col">
          <div className="cr_child circle-red"></div>
          <div className="cr_child circle-blue"></div>
        </div>
        <div
          className={`flex flex-col flex-1 px-8 gap-y-4 ${
            sideBarState
              ? "w-[calc(100%-3.75rem)]"
              : "w-full md:w-[calc(100%-21rem)]"
          }`}
        >
          <div className="w-full mt-5">
            <div className="flex flex-row items-center justify-between dark:bg-[#2b2f36] bg-white shadow_class rounded-md py-1.5 px-3">
              <h2 className="text-sm dark:text-slate-300 text-slate-700">
                You are in Presentation View
              </h2>
              <button className="dark:bg-black bg-gray-200 shadow_class text-sm py-1.5 px-2.5 rounded-md dark:text-slate-300 text-slate-700">
                End Call
              </button>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center my-auto">
            <ClassLayout localRef={localRef} sideBarState={sideBarState} />
          </div>
          <div className="w-full mb-6">
            <div className="flex flex-row gap-x-2">
              <div className="w-9 h-9 rounded-full glass_bg_base flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 dark:text-slate-300 text-slate-700"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8.465 11.293c1.133-1.133 3.109-1.133 4.242 0l.707.707 1.414-1.414-.707-.707c-.943-.944-2.199-1.465-3.535-1.465s-2.592.521-3.535 1.465L4.929 12a5.008 5.008 0 0 0 0 7.071 4.983 4.983 0 0 0 3.535 1.462A4.982 4.982 0 0 0 12 19.071l.707-.707-1.414-1.414-.707.707a3.007 3.007 0 0 1-4.243 0 3.005 3.005 0 0 1 0-4.243l2.122-2.121z"></path>
                  <path d="m12 4.929-.707.707 1.414 1.414.707-.707a3.007 3.007 0 0 1 4.243 0 3.005 3.005 0 0 1 0 4.243l-2.122 2.121c-1.133 1.133-3.109 1.133-4.242 0L10.586 12l-1.414 1.414.707.707c.943.944 2.199 1.465 3.535 1.465s2.592-.521 3.535-1.465L19.071 12a5.008 5.008 0 0 0 0-7.071 5.006 5.006 0 0 0-7.071 0z"></path>
                </svg>
              </div>
              <div
                onClick={shareScreen}
                className="w-9 h-9 rounded-full glass_bg_base flex justify-center items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 dark:text-slate-300 text-slate-700"
                  viewBox="0 0 24 24"
                  style={{}}
                  fill="currentColor"
                >
                  <path d="M20 3H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h7v3H8v2h8v-2h-3v-3h7c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 15V5h16l.001 10H4z"></path>
                  <path d="M10 13l5-3-5-3z"></path>
                </svg>
              </div>
              <div className="w-9 h-9 rounded-full glass_bg_base flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 dark:text-slate-300 text-slate-700"
                  viewBox="0 0 24 24"
                  style={{}}
                  fill="currentColor"
                >
                  <path d="M21.707 20.293l-3.388-3.388A7.942 7.942 0 0020 12.021h-2a5.95 5.95 0 01-1.109 3.456l-1.452-1.452c.348-.591.561-1.27.561-2.004v-6C16 3.804 14.215 2 12.021 2c-.07 0-.14.009-.209.025A4.005 4.005 0 008 6.021v.565L3.707 2.293 2.293 3.707l18 18 1.414-1.414zM10 6.021c0-1.103.897-2 2-2a.918.918 0 00.164-.015C13.188 4.08 14 4.956 14 6.021v6c0 .172-.029.335-.071.494L10 8.586V6.021zm-4 6H4c0 4.072 3.06 7.436 7 7.931v2.069h2v-2.07a7.993 7.993 0 002.218-.611l-1.558-1.558a5.979 5.979 0 01-1.66.239c-3.309 0-6-2.692-6-6z"></path>
                  <path d="M8.011 12.132a3.993 3.993 0 003.877 3.877l-3.877-3.877z"></path>
                </svg>
              </div>
              <div className="w-9 h-9 rounded-full glass_bg_base flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-red-600"
                  viewBox="0 0 24 24"
                  style={{}}
                  fill="currentColor"
                >
                  <path d="M10.09 12.5a8.92 8.92 0 01-1-2.2l1.59-1.59a1 1 0 000-1.42l-4-4a1 1 0 00-1.41 0L2.59 6A2 2 0 002 7.44 15.44 15.44 0 005.62 17L2.3 20.29l1.41 1.42 18-18-1.41-1.42zM7 15.55a13.36 13.36 0 01-3-8.13l2-2L8.59 8 7.3 9.29a1 1 0 00-.27.92 11 11 0 001.62 3.73zm9.71-2.26a1 1 0 00-1.41 0l-1.6 1.6-.34-.12-1.56 1.55a12.06 12.06 0 002 .66 1 1 0 00.91-.27l1.3-1.3L18.59 18l-2 2A13.61 13.61 0 0110 18.1l-1.43 1.45a15.63 15.63 0 008 2.45 2 2 0 001.43-.58l2.71-2.71a1 1 0 000-1.42z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <Sidebar
          toggleSideBarState={toggleSideBarState}
          sideBarState={sideBarState}
        />
      </div>
    )
  );
};

export default Index;
