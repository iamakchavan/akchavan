import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Cogito = (): JSX.Element => {
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
          <span className="text-dove-gray text-[13px] relative group-hover:text-persian-green transition-colors duration-200">
            <span className="relative">
              home
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-persian-green transition-all duration-500 group-hover:w-full"></span>
            </span>
          </span>
        </button>

        <h1 className="font-semantic-heading-1 text-persian-green text-[48px] tracking-[-1px] leading-[72px] mb-6">
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
            cogito ergo sum
          </span>
          <div className="text-[14px] text-persian-green/60 font-normal -mt-3 tracking-[1px]">
            /ˈkoː.ɡi.toː ˈer.ɡoː ˈsʊm/
          </div>
        </h1>

        <div className="space-y-8">
          <section>
            <p className="text-[12.8px] leading-6 text-[#666666]">
              <span className="text-black font-medium">"I think, therefore I am"</span> — a philosophical proposition by René Descartes, expressing the idea that the very act of thinking proves one's existence.
            </p>
          </section>

          <section>
            <h2 className="font-semantic-heading-2 text-emperor text-[14.75px] tracking-[-0.40px] leading-6 mb-3">
              Personal Philosophy
            </h2>
            <p className="text-[12.8px] leading-6 text-[#666666]">
              This phrase resonates deeply with my approach to design and development. Just as Descartes used doubt as a path to certainty, I believe in questioning assumptions and conventional wisdom to arrive at better solutions. Every project begins with thinking critically about the problem space and user needs.
            </p>
          </section>

          <section>
            <h2 className="font-semantic-heading-2 text-emperor text-[14.75px] tracking-[-0.40px] leading-6 mb-3">
              Application
            </h2>
            <p className="text-[12.8px] leading-6 text-[#666666]">
              In my work, this manifests as:
            </p>
            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-2 text-[12.8px] leading-6 text-[#666666]">
                <span className="w-1.5 h-1.5 mt-2 rounded-full bg-persian-green/60"></span>
                <span>Thoughtful consideration of user experience and interface design</span>
              </li>
              <li className="flex items-start gap-2 text-[12.8px] leading-6 text-[#666666]">
                <span className="w-1.5 h-1.5 mt-2 rounded-full bg-persian-green/60"></span>
                <span>Critical analysis of technical solutions and their implications</span>
              </li>
              <li className="flex items-start gap-2 text-[12.8px] leading-6 text-[#666666]">
                <span className="w-1.5 h-1.5 mt-2 rounded-full bg-persian-green/60"></span>
                <span>Continuous learning and questioning of established practices</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};