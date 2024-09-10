import Classroom from "@/components/class/Classroom";
import StudentClassroom from "@/components/class/StudentClassroom";
import useLoading from "@/hooks/useLoading";
import AuthMiddleware from "@/middlewares/AuthMiddleware";
import { CallProps } from "@/types";
import { getCall, getProfile } from "@/utils/call";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import PickSeat from "../seat";

const Class = () => {
  const router = useRouter();
  const { id } = router.query;

  const [call, setCall] = useState<CallProps>({});
  const [profile, setProfile] = useState<any>({});
  const { isLoading, stopLoading } = useLoading(true);
  const { isLoading: isSeatLoading, stopLoading: stopSeatLoading } =
    useLoading(true);

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

  const seat = useMemo(() => {
    if (!parsedId) return false;

    const seats = localStorage.getItem("seats");
    if (!seats) {
      stopSeatLoading();
      return false;
    }
    try {
      const seatObjects = JSON.parse(seats);
      stopSeatLoading();
      return seatObjects[parsedId];
    } catch (error) {
      stopSeatLoading();

      return false;
    }
  }, [parsedId]);

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

  return (
    !isLoading && (
      <section className="w-full h-screen min-h-screen">
        {isTeacher ? (
          <AuthMiddleware>
            {" "}
            <Classroom sessionId={call.session} />
          </AuthMiddleware>
        ) : !isSeatLoading ? (
          seat ? (
            <StudentClassroom sessionId={call.session} />
          ) : (
            <PickSeat callId={parsedId} />
          )
        ) : (
          <p>still loading</p>
        )}
      </section>
    )
  );
};

export default Class;
