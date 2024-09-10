interface Props {
  sideBar: boolean,
}

const ClassLayout: React.FC<Props> = ({sideBar}) => {
  return (
    <section className="w-full h-full flex justify-center items-center">
      <div
        className={`relative overflow-hidden w-full h-0 rounded-xl ${sideBar ? 'md:pb-[42.85%] pb-[56.25%]' : 'md:pb-[56.25%] pb-[56.25%]'}`}
      >
        <iframe
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="https://www.youtube.com/embed/aqz-KE-bpKQ?si=ruUVBGZpP6Rg7dU7"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
};

export default ClassLayout;
