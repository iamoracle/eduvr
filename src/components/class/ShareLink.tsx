import React from "react";
import { toast } from "sonner";

const ShareLink: React.FC = () => {
  const copyLinkToClipboard = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      toast.success("Link copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy the link.");
    }
  };

  return (
    <button onClick={copyLinkToClipboard} className="focus:outline-none">
      <div className="w-12 h-12 rounded-full glass_bg flex justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-slate-700"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M8.465 11.293c1.133-1.133 3.109-1.133 4.242 0l.707.707 1.414-1.414-.707-.707c-.943-.944-2.199-1.465-3.535-1.465s-2.592.521-3.535 1.465L4.929 12a5.008 5.008 0 0 0 0 7.071 4.983 4.983 0 0 0 3.535 1.462A4.982 4.982 0 0 0 12 19.071l.707-.707-1.414-1.414-.707.707a3.007 3.007 0 0 1-4.243 0 3.005 3.005 0 0 1 0-4.243l2.122-2.121z"></path>
          <path d="m12 4.929-.707.707 1.414 1.414.707-.707a3.007 3.007 0 0 1 4.243 0 3.005 3.005 0 0 1 0 4.243l-2.122 2.121c-1.133 1.133-3.109 1.133-4.242 0L10.586 12l-1.414 1.414.707.707c.943.944 2.199 1.465 3.535 1.465s2.592-.521 3.535-1.465L19.071 12a5.008 5.008 0 0 0 0-7.071 5.006 5.006 0 0 0-7.071 0z"></path>
        </svg>
      </div>
    </button>
  );
};

export default ShareLink;
