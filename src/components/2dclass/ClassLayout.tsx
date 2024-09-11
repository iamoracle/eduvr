"use client";
interface Props {
  sideBarState: boolean;
  localRef: any;
}

const ClassLayout: React.FC<Props> = ({ sideBarState, localRef }) => {
  return (
    <section className="w-full h-full flex justify-center items-center">
      <div
        className={`relative overflow-hidden w-full h-0 rounded-xl ${
          sideBarState
            ? "md:pb-[42.85%] pb-[56.25%]"
            : "md:pb-[56.25%] pb-[56.25%]"
        }`}
      >
        <video src="/videos/intro.MOV" ref={localRef} controls></video>
      </div>
    </section>
  );
};

export default ClassLayout;
