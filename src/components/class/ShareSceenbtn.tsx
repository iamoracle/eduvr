interface Props {
  onShareScreen: any;
}

const ShareScreenButton: React.FC<Props> = ({ onShareScreen }) => (
  <button onClick={onShareScreen}>
    <div className="w-12 h-12 rounded-full glass_bg flex justify-center items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 text-slate-700"
        viewBox="0 0 24 24"
        style={{}}
        fill="currentColor"
      >
        <path d="M20 3H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h7v3H8v2h8v-2h-3v-3h7c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 15V5h16l.001 10H4z"></path>
        <path d="M10 13l5-3-5-3z"></path>
      </svg>
    </div>
  </button>
);

export default ShareScreenButton;
