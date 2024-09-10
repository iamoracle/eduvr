

export const Board = ({ localRef }) => {


  return (
    <div className="w-[1700px] h-[415px] flex flex-row relative overflow-y-auto bg-slate-900">
      <video
        ref={localRef}
        className="w-full h-full object-cover"
        controls
      ></video>
    </div>
  );
};
