import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Live = (): JSX.Element => {
  const navigate = useNavigate();

  const [isLeaving, setIsLeaving] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return (
    <div 
      className="min-h-screen bg-ivory px-4 py-16 transition-opacity duration-500 ease-in-out"
      style={{
        opacity: mounted && !isLeaving ? 1 : 0,
        transform: `translateY(${mounted && !isLeaving ? '0' : '20px'})`,
        transition: 'opacity 500ms ease-in-out, transform 500ms ease-in-out'
      }}
    >
      <div className="w-full max-w-[568px] mx-auto">
        <button
          onClick={() => {
            setIsLeaving(true);
            setTimeout(() => navigate("/"), 500);
          }}
          className="mb-8 p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors duration-200 group flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5 text-dove-gray group-hover:text-persian-green transition-colors duration-200" />
          <span className="text-dove-gray group-hover:text-persian-green transition-colors duration-200 text-[13px]">
            home
          </span>
        </button>
        <div className="bg-white/50 rounded-lg p-6 backdrop-blur-sm border border-gray-100/30">
          <h1 className="font-semantic-heading-1 text-persian-green text-[32px] tracking-[-1px] leading-[48px] mb-4">
            Let's Chat
          </h1>
          <p className="text-[12.8px] leading-5 text-[#666666] mb-6">
            This is where we'll have our conversation. I'm working on making this space more interactive!
          </p>
          <div className="animate-pulse w-full h-12 bg-persian-green/10 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};