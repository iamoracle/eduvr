export const createEmptyMediaStream = () => {
  return new MediaStream([
    createEmptyAudioTrack(),
    createEmptyVideoTrack({ width: 640, height: 480 }),
  ]);
};

const createEmptyAudioTrack = () => {
  const ctx = new AudioContext();
  const oscillator = ctx.createOscillator();
  const dst: any = oscillator.connect(ctx.createMediaStreamDestination());
  oscillator.start();
  const track = dst.stream.getAudioTracks()[0];
  return Object.assign(track, { enabled: false });
};

const createEmptyVideoTrack = ({ width, height }: any) => {
  const canvas = Object.assign(document.createElement("canvas"), {
    width,
    height,
  });
  const ctx: any = canvas.getContext("2d");
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, width, height);

  const stream = canvas.captureStream();
  const track = stream.getVideoTracks()[0];

  return Object.assign(track, { enabled: false });
};
