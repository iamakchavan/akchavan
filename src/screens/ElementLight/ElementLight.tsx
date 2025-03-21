import {
  ClockIcon,
  SunIcon,
  SunriseIcon,
  MoonIcon,
  FileTextIcon,
  GithubIcon,
  InfoIcon,
  LinkedinIcon,
  MailIcon,
  ArrowUpRight,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";

// Project data for mapping
const projects = [
  {
    title: "HARV: AI Browser Extension",
    description: "HARV is a powerful browser extension that brings AI-powered assistance directly into your browsing experience!",
    link: "https://github.com/iamakchavan/HARV",
  },
  {
    title: "Paradox",
    description: "A minimalistic Open-Source AI Chatbot combining powerful AI models for intelligent conversations with web search, coding, reasoning, and voice interaction capabilities.",
    link: "https://paradoxed.vercel.app",
  },
  {
    title: "Amazicons",
    description: "A collection of all the icons that you'll ever need, that I use in my designs too!",
    link: "https://www.figma.com/community/file/1484678564434143542",
  },
  {
    title: "2025-in-pixels",
    description: "A visual representation of 2025 in pixels with daily progress tracking.",
    link: "https://cyberyear.vercel.app",
  },
  {
    title: "dAILy",
    description: "dAILy - An AI-powered news platform that presents tech news in both developer and layman terms",
    link: "https://dailyonai.netlify.app"
  },
  {
    title: "Netflix UI Redesign.",
    description: "User-friendly navigation, immersive content discovery, and seamless viewing. The design enhances the overall user experience while maintaining familiar elements.",
    link: "https://www.figma.com/community/file/1304924283884726314"
  },
];

// Social links data
const socialLinks = [
  { icon: <FileTextIcon className="w-4 h-4" />, text: "resume", href: "https://drive.google.com/file/d/1CySHAXNyA9uDEqi3OtO4HUmdCftVH5N5/view?usp=sharing" },
  { icon: <LinkedinIcon className="w-4 h-4" />, text: "linkedin", href: "https://linkedin.com/in/abhishek-k-chavan-763b2929a" },
  { icon: <img src="/x.png" alt="X" className="w-4 h-4" />, text: "x", href: "https://x.com/iamakchavan" },
  { icon: <GithubIcon className="w-4 h-4" />, text: "github", href: "https://github.com/iamakchavan" },
  { icon: <MailIcon className="w-4 h-4" />, text: "email", href: "mailto:akchavan@outlook.com" },
];

export const ElementLight = (): JSX.Element => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(true);
  const [showAllProjects, setShowAllProjects] = useState(false);

  const visibleProjects = showAllProjects ? projects : projects.slice(0, 4);

  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
          );
          const data = await response.json();
          setLocation(data.city || data.locality || 'Local Time');
        } catch (error) {
          console.error("Error getting location:", error);
          setLocation('Local Time');
        } finally {
          setLoading(false);
        }
      }, (error) => {
        console.error("Geolocation error:", error);
        setLocation('Local Time');
        setLoading(false);
      });
    } else {
      setLocation('Local Time');
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    
    getUserLocation();

    return () => clearInterval(timer);
  }, []);

  const timeString = currentTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  // Get timezone abbreviation
  const timezone = new Intl.DateTimeFormat('en', {
    timeZoneName: 'short'
  }).formatToParts(currentTime).find(part => part.type === 'timeZoneName')?.value || '';

  const getTimeIcon = () => {
    const hour = currentTime.getHours();
    
    if (hour >= 6 && hour < 8) {
      return <SunriseIcon className="w-3.5 h-3.5 text-dove-gray" />;
    } else if (hour >= 8 && hour < 18) {
      return <SunIcon className="w-3.5 h-3.5 text-dove-gray" />;
    } else {
      return <MoonIcon className="w-3.5 h-3.5 text-dove-gray" />;
    }
  };

  return (
    <div className="flex flex-col items-center px-4 py-16 bg-ivory min-h-screen">
      <div className="w-full max-w-[568px]">
        {/* Header */}
        <header className="w-full mb-14">
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-2">
              <div 
                onClick={() => navigate('/live')}
                className="w-[24px] h-[24px] rounded-full bg-gradient-to-br from-persian-green to-persian-green/60 animate-pulse hover:scale-125 hover:rotate-[720deg] hover:from-persian-green hover:to-persian-green transition-all duration-[1200ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-lg hover:shadow-persian-green/50 relative before:absolute before:inset-0 before:rounded-full before:bg-persian-green/20 before:scale-[1.4] before:opacity-0 hover:before:scale-100 hover:before:opacity-100 before:transition-all before:duration-[800ms] before:ease-out cursor-pointer"
                style={{
                  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                }}
              />
              <span
                onClick={() => navigate('/live')}
                className="text-[13px] font-medium tracking-tight relative cursor-pointer"
                style={{
                  background: 'linear-gradient(120deg, rgba(83, 83, 83, 0.1) 0%, rgba(83, 83, 83, 0.9) 25%, rgba(83, 83, 83, 0.9) 50%, rgba(83, 83, 83, 0.1) 75%, rgba(83, 83, 83, 0.9) 100%)',
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundSize: '400% 100%',
                  animation: 'shimmer 3s ease-in-out infinite'
                }}
              >talk to me!</span>
            </div>

            <nav className="flex space-x-4">
              <span 
                onClick={() => navigate('/cogito')}
                className="font-normal text-dove-gray text-[14.5px] tracking-[-0.40px] leading-6 relative group cursor-pointer transition-all duration-300 hover:text-persian-green"
                style={{
                  transform: 'translateZ(0)',
                  WebkitFontSmoothing: 'antialiased'
                }}
              >
                cogito ergo sum
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-persian-green transition-all duration-500 group-hover:w-full"></span>
              </span>
            </nav>
          </div>

          <h1 className="font-semantic-heading-1 text-persian-green text-[40px] tracking-[-1px] leading-[60px] mb-4">
            <span className="inline-block transform hover:scale-[1.02] transition-all duration-300 relative group" style={{
              textShadow: `
                1px 1px 0 rgba(6, 182, 212, 0.4),
                2px 2px 0 rgba(6, 182, 212, 0.3),
                3px 3px 0 rgba(6, 182, 212, 0.2),
                4px 4px 0 rgba(6, 182, 212, 0.1),
                8px 8px 15px rgba(0, 0, 0, 0.05)
              `,
              transform: 'perspective(500px) rotateX(10deg)'
            }}>
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                background: 'linear-gradient(120deg, rgba(6, 182, 212, 0.1) 0%, rgba(6, 182, 212, 0.9) 25%, rgba(6, 182, 212, 0.9) 50%, rgba(6, 182, 212, 0.1) 75%, rgba(6, 182, 212, 0.9) 100%)',
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundSize: '400% 100%',
                animation: 'shimmer 3s ease-in-out infinite'
              }}>
                Abhishek Chavan
              </span>
              <span className="text-persian-green group-hover:opacity-0 transition-opacity duration-300">
                Abhishek Chavan
              </span>
            </span>
          </h1>

          <div className="flex items-center mb-4">
            <span className="font-bold text-emperor text-[14.9px] tracking-[-0.40px] leading-6">
              designer
            </span>
            <div className="w-1 h-1 mx-2 bg-emperor rounded"></div>
            <span className="font-bold text-emperor text-[14.9px] tracking-[-0.40px] leading-6">
              developer
            </span>
            <div className="w-1 h-1 mx-2 bg-emperor rounded"></div>
            <span className="font-bold text-emperor text-[14.75px] tracking-[-0.40px] leading-6">
              researcher
            </span>
          </div>

          {/* Bio */}
          <p className="text-[12.8px] leading-5 mb-4">
            <span className="text-[#666666]">
              Hi, I'm Abhishek, 22. I'm fascinated by{" "}
            </span>
            <span className="text-black">extended reality</span>
            <span className="text-[#666666]"> and </span>
            <span className="text-black">building things for the web</span>
            <span className="text-[#666666]">
              . I also have a soft spot for clean,{" "}
            </span>
            <span className="text-black">minimalist UI design</span>
            <span className="text-[#666666]">
              . Always looking for new problems to solve and new technologies to explore.
            </span>
          </p>

          {/* Social Links */}
          <div className="flex flex-wrap gap-2 mb-6 mt-8">
            {socialLinks.map((link, index) => (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                key={index}
                className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/30 backdrop-blur-sm border border-gray-100/30 transition-colors duration-200 hover:border-persian-green"
              >
                <span className={`text-dove-gray/70 group-hover:text-persian-green/90 transition-colors duration-200 ${link.text === 'x' ? 'font-bold' : ''}`}>
                  {link.icon}
                </span>
                <span className="font-medium text-dove-gray/80 text-[13px] tracking-[-0.3px] leading-5 group-hover:text-persian-green/90 transition-colors duration-200">
                  {link.text}
                </span>
              </a>
            ))}
          </div>
        </header>

        {/* Projects Section */}
        <section className="mb-12">
          <h2 className="font-semantic-heading-2 text-emperor text-[14.75px] tracking-[-0.40px] leading-6 mb-4">
            Projects
          </h2>

          <div className="space-y-2 transition-all duration-300 ease-in-out">
            {visibleProjects.map((project, index) => (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                key={index}
                className="block transform transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                style={{
                  opacity: showAllProjects || index < 4 ? 1 : 0,
                  maxHeight: showAllProjects || index < 4 ? '200px' : '0',
                  transform: showAllProjects || index < 4 ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0.95)',
                  overflow: 'hidden'
                }}
              >
                <Card className="border-none shadow-none bg-transparent hover:bg-white/50 transition-all duration-500 ease-out rounded-lg group hover:shadow-xl hover:shadow-persian-green/10 hover:scale-[1.02] relative before:absolute before:inset-0 before:bg-gradient-to-br before:from-persian-green/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500">
                  <CardContent className="p-3 relative">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-[#535353] text-[12.9px] tracking-[-0.05px] leading-5 group-hover:text-persian-green transition-all duration-300">
                        {project.title}
                      </h3>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-persian-green transition-all duration-500 transform translate-y-1 translate-x-[-1px] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:rotate-[-12deg]" />
                    </div>
                    <p className="text-[#666666] text-[12.9px] leading-5 transition-all duration-300 group-hover:text-[#535353]">
                      {project.description}
                    </p>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
          
          {!showAllProjects && projects.length > 4 && (
            <div className="mt-4">
              <button
                onClick={() => {
                  setShowAllProjects(true);
                }}
                className="text-[11.5px] text-dove-gray/70 relative group cursor-pointer"
              >
                <span className="relative">
                  see more
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-persian-green transition-all duration-500 group-hover:w-full"></span>
                </span>
              </button>
            </div>
          )}
          
          {showAllProjects && (
            <div className="mt-4">
              <button
                onClick={() => {
                  setShowAllProjects(false);
                }}
                className="text-[11.5px] text-dove-gray/70 relative group cursor-pointer"
              >
                <span className="relative">
                  see less
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-persian-green transition-all duration-500 group-hover:w-full"></span>
                </span>
              </button>
            </div>
          )}

          <div className="mt-6 p-2.5 sm:p-3 bg-white/40 rounded-lg border border-solid border-gray-100/40 flex items-center group hover:bg-white/50 hover:border-persian-green/20 transition-all duration-300">
            <InfoIcon className="w-3.5 h-3.5 mr-3 text-persian-green/70 group-hover:text-persian-green transition-colors duration-300" />
            <p className="text-[#666666] text-[11.5px] sm:text-[13px] leading-5 sm:leading-6">
              Feel free to explore my{" "}
              <a href="https://github.com/iamakchavan" target="_blank" rel="noopener noreferrer" className="font-medium text-persian-green/80 hover:text-persian-green transition-all duration-300 underline decoration-persian-green/60 hover:decoration-persian-green relative after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[2px] after:bg-persian-green/20 after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-500 after:origin-left">
                GitHub
              </a>
              {" "}&{" "}
              <a href="https://figma.com/@akchavan" target="_blank" rel="noopener noreferrer" className="font-medium text-persian-green/80 hover:text-persian-green transition-all duration-300 underline decoration-persian-green/60 hover:decoration-persian-green relative after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[2px] after:bg-persian-green/20 after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-500 after:origin-left">
                Figma
              </a>{" "}
              for more projects and design work.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-4">
          <Separator className="h-px bg-emperor mb-4" />
          <div className="flex justify-between items-center">
            <span className="font-normal text-dove-gray text-[11px] sm:text-[13px] leading-4 sm:leading-5">
              © 2025 Abhishek Chavan
            </span>
            <div className="flex items-center gap-2">
              {getTimeIcon()}
              <span className="font-inter-regular text-dove-gray text-[11px] sm:text-[13px] leading-4 sm:leading-5">
                {loading ? "Loading..." : `${location}, ${timeString} (${timezone})`}
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
