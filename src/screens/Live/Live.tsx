import React from "react";
import { ArrowLeft, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { VoiceAgent } from "../../components/VoiceAgent";

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
      <div className="w-full max-w-[568px] mx-auto relative">
        <button
          onClick={() => {
            setIsLeaving(true);
            setTimeout(() => navigate("/"), 500);
          }}
          className="mb-8 p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors duration-200 group flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5 text-dove-gray group-hover:text-persian-green transition-colors duration-200" />
          <span className="text-dove-gray text-[13px] relative group-hover:text-persian-green transition-colors duration-200">
            <span className="relative">
              home
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-persian-green transition-all duration-500 group-hover:w-full"></span>
            </span>
          </span>
        </button>
        <div className="space-y-12">
          <div className="relative">
            <h1 className="font-semantic-heading-1 text-persian-green text-[48px] tracking-[-1px] leading-[72px] mb-4">
              <span className="inline-block transform hover:scale-[1.02] transition-transform duration-300" style={{
                textShadow: `
                  1px 1px 0 rgba(6, 182, 212, 0.4),
                  2px 2px 0 rgba(6, 182, 212, 0.3),
                  3px 3px 0 rgba(6, 182, 212, 0.2),
                  4px 4px 0 rgba(6, 182, 212, 0.1),
                  8px 8px 15px rgba(0, 0, 0, 0.05)
                `,
                transform: 'perspective(500px) rotateX(10deg)',
              }}>
              ring me up!
              </span>
            </h1>
            <p className="text-[12.8px] leading-6 text-[#666666] max-w-[80%]">
              Start a conversation with me using your voice! Click the orb below to begin.
            </p>
            <p className="text-[12.8px] leading-6 text-[#666666] max-w-[80%] mt-2 italic">
              (Psst! If Seraphina is having one of those AI moments, you can always drop me an email below!)
            </p>
            <div className="absolute top-[-20px] right-[-30px] w-[100px] h-[100px] bg-gradient-to-br from-persian-green/5 to-transparent rounded-full blur-2xl animate-pulse" />
          </div>
          
          <div className="flex justify-start">
            <VoiceAgent />
          </div>
          
          <div className="mt-48">
            <a
              href="mailto:akchavan@outlook.com"
              className="text-[12.8px] leading-6 text-[#666666] hover:text-persian-green transition-colors duration-300 relative group"
            >
              email
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-persian-green transition-all duration-500 group-hover:w-full"></span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};