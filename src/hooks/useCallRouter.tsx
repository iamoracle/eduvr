import { useEffect, useMemo, useState } from "react";
import useLoading from "./useLoading";
import { CallProps } from "@/types";
import { getCall, getProfile } from "@/utils/call";
import { useRouter } from "next/router";

const useCallRouter = (id: any) => {
  const [call, setCall] = useState<CallProps>({});
  const [profile, setProfile] = useState<any>({});
  const { isLoading, stopLoading } = useLoading(true);
  const router = useRouter();

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

  const isTeacher = useMemo(() => {
    if (profile && call) {
      return profile._id == call.user;
    }
    return false;
  }, [profile, call]);

  useEffect(() => {
    if (!id) return;

    let _id: string;

    if (typeof id === "object") {
      _id = id[0];
    } else {
      _id = id;
    }

    const _getCall = async () => {
      const call: CallProps = await getCall(_id);
      setCall(call ?? {});
    };

    const _getProfile = async () => {
      const profile = await getProfile();
      setProfile(profile ?? {});
    };

    const _execute = async () => {
      await _getCall();
      await _getProfile();
      stopLoading();
    };

    _execute();
  }, [id]);

  useEffect(() => {
    if (!isLoading && !call?._id) {
      router.push("/404");
    }
  }, [call, isLoading]);

  return { isLoading, call, isTeacher };
};

export default useCallRouter;
