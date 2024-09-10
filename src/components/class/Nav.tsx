import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
import { useMemo } from "react";

import { toast } from "sonner";
import ShareLink from "./ShareLink";
import ShareScreenButton from "./ShareSceenbtn";

interface Props {
    shareScreen: any;
}

export const Navbar : React.FC<Props> = ({ shareScreen }) => {

    const router = useRouter();
    const { id } = router.query;

    const parsedId = useMemo(() : string => {
        if (!id) return "";
    
        let _id: string;
    
        if (typeof id === "object") {
          _id = id[0];
        } else {
          _id = id;
        }
    
        return _id;
      }, [id])


    const EndCall = async () => {
        try {
            await deactivateCall(parsedId);
            router.push("/callend");
        } catch (error : any) {
            toast("Error", {
                description: error?.response?.data?.message,
            });
        }
    }
    
    return(
        <>
            <div className="text-xs mt-auto flex gap-y-3 py-8 flex-col-reverse">
                    <div className="w-12 h-12 rounded-full glass_bg flex justify-center items-center" onClick={EndCall}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 text-red-600"
                            viewBox="0 0 24 24"
                            style={{}}
                            fill="currentColor"
                            >
                            <path d="M10.09 12.5a8.92 8.92 0 01-1-2.2l1.59-1.59a1 1 0 000-1.42l-4-4a1 1 0 00-1.41 0L2.59 6A2 2 0 002 7.44 15.44 15.44 0 005.62 17L2.3 20.29l1.41 1.42 18-18-1.41-1.42zM7 15.55a13.36 13.36 0 01-3-8.13l2-2L8.59 8 7.3 9.29a1 1 0 00-.27.92 11 11 0 001.62 3.73zm9.71-2.26a1 1 0 00-1.41 0l-1.6 1.6-.34-.12-1.56 1.55a12.06 12.06 0 002 .66 1 1 0 00.91-.27l1.3-1.3L18.59 18l-2 2A13.61 13.61 0 0110 18.1l-1.43 1.45a15.63 15.63 0 008 2.45 2 2 0 001.43-.58l2.71-2.71a1 1 0 000-1.42z"></path>
                        </svg>
                    </div>
                    <div className="w-12 h-12 rounded-full glass_bg flex justify-center items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 text-slate-700"
                            viewBox="0 0 24 24"
                            style={{}}
                            fill="currentColor"
                            >
                            <path d="M21.707 20.293l-3.388-3.388A7.942 7.942 0 0020 12.021h-2a5.95 5.95 0 01-1.109 3.456l-1.452-1.452c.348-.591.561-1.27.561-2.004v-6C16 3.804 14.215 2 12.021 2c-.07 0-.14.009-.209.025A4.005 4.005 0 008 6.021v.565L3.707 2.293 2.293 3.707l18 18 1.414-1.414zM10 6.021c0-1.103.897-2 2-2a.918.918 0 00.164-.015C13.188 4.08 14 4.956 14 6.021v6c0 .172-.029.335-.071.494L10 8.586V6.021zm-4 6H4c0 4.072 3.06 7.436 7 7.931v2.069h2v-2.07a7.993 7.993 0 002.218-.611l-1.558-1.558a5.979 5.979 0 01-1.66.239c-3.309 0-6-2.692-6-6z"></path>
                            <path d="M8.011 12.132a3.993 3.993 0 003.877 3.877l-3.877-3.877z"></path>
                        </svg>
                    </div>
                    <ShareScreenButton onShareScreen={shareScreen} />
                    <ShareLink />
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <div className="w-12 h-12 rounded-full glass_bg justify-center items-center hidden">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 text-slate-700"
                                    viewBox="0 0 24 24"
                                    style={{}}
                                    fill="currentColor"
                                    >
                                    <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
                                </svg>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-40 glass_bg mx-10">
                            <DropdownMenuItem>Participant List</DropdownMenuItem>
                            <DropdownMenuItem>Reaction</DropdownMenuItem>
                            <DropdownMenuItem>Record</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
        </>
    );
}