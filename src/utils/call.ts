import axios from "@/network/axios";

export const createCall = async () => {
  const call = await axios.post("/call");

  return call.data;
};

export const getCall = async (id: string) => {
  try {
    const call = await axios.get(`/call/${id}`);
    return call.data;
  } catch (error) {
    return null;
  }
};

type CallParticipantProps = {
  avatar: number;
  position: number;
  callId: string;
};

export const createCallParticipant = async (props: CallParticipantProps) => {
    const call = await axios.post(`/call/participant`, props);
    return call.data;
  
};

export const getCallParticipants = async (callId: string) => {
  try {
    const call = await axios.get(`/call/participant/${callId}`);
    return call.data;
  } catch (error) {
    return null;
  }
};

export const getMyCalls = async () => {
  try {
    const call = await axios.get(`/call`);
    return call.data;
  } catch (error) {
    return null;
  }
};

export const getAvailablePositions = async (callId: string) => {
  try {
    const call = await axios.get(`/call/positions/${callId}`);
    return call.data;
  } catch (error) {
    return null;
  }
};

export const getProfile = async () => {
  try {
    const call = await axios.get(`/auth/profile`);
    return call.data;
  } catch (error) {
    return null;
  }
};

export const getStats = async () => {
  try {
    const call = await axios.get(`/call/stats`);
    return call.data;
  } catch (error) {
    return null;
  }
};

export const deactivateCall = async (callId: string) => {
  try {
    const call = await axios.post(`/call/deactivate/${callId}`);
    return call.data;
  } catch (error) {
    return null;
  }
};
