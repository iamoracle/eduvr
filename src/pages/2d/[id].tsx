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
import useClientPeer from "@/hooks/useClientPeer";
import { useRouter } from "next/router";
import useCallRouter from "@/hooks/useCallRouter";

import Preloader from "@/components/Preloader";
import ShareLinkUrl from "@/components/2dclass/ShareLinkUrl";
import { Toaster } from "sonner";
import LeaveCall from "@/components/2dclass/LeaveCall";

const Index = () => {
  const [sideBarState, setSideBarState] = useState<boolean>(false);

  const router = useRouter();

  const { id } = router.query;

  const { call, isLoading } = useCallRouter(id);

  const { remoteRef } = useClientPeer(call.session ?? "", call, isLoading);

  const toggleSideBarState = useCallback(() => {
    setSideBarState((state) => !state);
  }, []);

  if (isLoading || !call?._id) {
    return <Preloader />;
  }

  // if (isTeacher) {
  //   return router.push("/404");
  // }

  const switch3D = () => {
    router.push(`/class/${id}`)
  } 

  return (
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
              You are in 2D Classroom view
            </h2>
            <button onClick={switch3D} className="dark:bg-black hover:dark:bg-black/20 transition-all bg-gray-200 shadow_class text-sm py-1.5 px-2.5 rounded-md dark:text-slate-300 text-slate-700">
              Switch to 3D
            </button>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center my-auto">
          <ClassLayout localRef={remoteRef} sideBarState={sideBarState} />
        </div>
        <div className="w-full mb-6">
          <div className="flex flex-row gap-x-2">
            <ShareLinkUrl />
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
            <LeaveCall />
          </div>
        </div>
      </div>
      <Toaster />
      <Sidebar
        toggleSideBarState={toggleSideBarState}
        sideBarState={sideBarState}
      />
    </div>
  );
};

export default Index;
