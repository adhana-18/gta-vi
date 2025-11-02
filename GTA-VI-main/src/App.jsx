import React, { useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import "remixicon/fonts/remixicon.css";
import gsap from "gsap";

function App() {
  const [showContent, setShowContent] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 2,
      delay: "1",
      ease: "power4.easeInOut",
      transformOrigin: "50% 50%",
    }).to(".vi-mask-group", {
      scale: isMobile ? 20 : 10, // Larger scale for mobile to ensure full coverage
      duration: 2,
      delay: -1.8,
      rotate: 90,
      ease: "expo.easeInOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate: function () {
        if (this.progress() >= 0.9) {
          document.querySelector(".svg")?.remove();
          setShowContent(true);
          this.kill();
        }
      },
    });
  }, [isMobile]);

  useGSAP(() => {
    if (!showContent) return;

    gsap.to(".main", {
      scale: 1,
      rotate: 0,
      duration: 2,
      ease: "Expo.easeInOut",
      delay: "-1",
    });

    gsap.to(".sky", {
      scale: isMobile ? 2.2 : 1.8,
      rotate: -20,
      duration: 2,
      ease: "Expo.easeInOut",
      delay: "-0.7",
    });

    gsap.to(".bg", {
      scale: isMobile ? 1.3 : 1.1,
      rotate: -3,
      duration: 2,
      ease: "Expo.easeInOut",
      delay: "-0.7",
    });

    gsap.to(".character", {
      scale: isMobile ? 1 : 0.8,
      rotate: -8,
      x: "-50%",
      duration: 2,
      ease: "Expo.easeInOut",
      delay: "-0.7",
    });

    const main = document.querySelector(".main");
    const handleMouseMove = (e) => {
      const xMove = (e.clientX / window.innerWidth - 0.5) * (isMobile ? 20 : 40);

      gsap.to(".main .text", {
        x: `${xMove * 0.4}%`,
      });

      gsap.to(".sky", {
        x: xMove,
      });

      gsap.to(".bg", {
        x: xMove * (isMobile ? 1 : 1.7),
      });
    };

    main?.addEventListener("mousemove", handleMouseMove);

    return () => {
      main?.removeEventListener("mousemove", handleMouseMove);
    };
  }, [showContent, isMobile]);

  return (
    <>
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize={isMobile ? "150" : "250"}
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>

      {showContent && (
        <div className="w-full main rotate-[-10deg] scale-[1.7]">
          <div className="landing w-full h-screen bg-black">
            <div className="navbar w-full py-5 px-4 md:px-10 absolute top-0 left-0 z-[10]">
              <div className="logo flex items-center gap-2">
                <div className="lines flex flex-col gap-1">
                  <div className="line w-8 md:w-12 h-1 bg-white"></div>
                  <div className="line w-5 md:w-8 h-1 bg-white"></div>
                  <div className="line w-4 md:w-6 h-1 bg-white"></div>
                </div>
                <h3 className="text-xl md:text-2xl -mt-[6px] md:-mt-[8px] leading-none text-white">
                  Rockstar
                </h3>
              </div>
            </div>

            <div className="imagesdiv relative overflow-hidden w-full h-screen">
              <img
                className="absolute sky scale-[2.2] rotate-[-25deg] top-0 left-0 w-full h-full object-cover"
                src="./sky.png"
                alt=""
              />
              <img
                className="absolute bg scale-[1.1] rotate-[-18deg] bg top-0 left-0 w-full h-full object-cover"
                src="./bg.png"
                alt=""
              />
              <div className="text absolute flex flex-col top-3 left-1/2 -translate-x-1/2">
                <h1 className="text-4xl md:text-7xl leading-none -ml-10 md:-ml-35 text-white">
                  Grand
                </h1>
                <h1 className="text-4xl md:text-7xl leading-none ml-10 md:ml-25 text-white">
                  Theft
                </h1>
                <h1 className="text-4xl md:text-7xl leading-none -ml-10 md:-ml-35 text-white">
                  auto
                </h1>
              </div>
              <img
                className="absolute character -bottom-[100%] left-1/2 -translate-x-1/2 scale-[1.5] md:scale-[2] rotate-[-15deg]"
                src="./girlbg.png"
                alt=""
              />
            </div>

            <div className="btmbar w-full py-4 md:py-6 bg-gradient-to-t from-black to-transparent px-4 md:px-10 absolute bottom-0 left-0">
              <div className="flex gap-2 text-white text-sm md:text-xl items-center">
                <i className="ri-arrow-down-line"></i>
                <h3>Scroll Down</h3>
              </div>
              <img
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[30px] md:h-[50px]"
                src="./ps5.png"
                alt="PlayStation 5"
              />
            </div>
          </div>

          <div className="w-full h-screen flex px-4 md:px-10 bg-black items-center justify-center">
            <div className="cntnr flex flex-col md:flex-row text-white w-full h-[80%]">
              <div className="limg relative w-full md:w-1/2 h-1/2 md:h-full">
                <img
                  className="absolute scale-[0.5] md:scale-[0.7] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  src="./imag.png"
                  alt="Game content"
                />
              </div>
              <div className="rg w-full md:w-[40%] py-3">
                <h1 className="text-3xl md:text-5xl">Still running</h1>
                <h1 className="text-3xl md:text-5xl">not Hunting</h1>
                <p className="mt-5 md:mt-10 text-xs md:text-sm font-[Helvetica_Now_Display]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet mollitia modi
                  dolorum, itaque quaerat, autem quae quia molestias corporis sapiente assumenda
                  maiores ut.
                </p>
                <p className="mt-2 text-xs md:text-sm font-[Helvetica_Now_Display]">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint laboriosam et enim
                  in a optio. Quam minima eos laboriosam asperiores vero tenetur aperiam voluptate
                  odit?
                </p>
                <p className="mt-5 md:mt-10 text-xs md:text-sm font-[Helvetica_Now_Display]">
                  Lorem ipsum dolor, sit elit. Sint laboriosam et enim in a optio. Quam minima eos
                  laboriosam asperiores vero tenetur aperiam voluptate odit?
                </p>
                <button className="bg-yellow-500 px-4 md:px-6 mt-3 py-1 md:py-2 text-lg md:text-2xl text-black">
                  Download Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
