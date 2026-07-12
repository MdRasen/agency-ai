import { useState, useRef, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustedBy from "./components/TrustedBy";
import Services from "./components/Services";
import OurWork from "./components/OurWork";
import Teams from "./components/Teams";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";

const App = () => {
  const [theme, setTheme] = useState(
    //    get theme from local storage if available
    //    else set theme to light
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light",
  );

  const dotRef = useRef(null);
  const outlineRef = useRef(null);

  //  Refs for custom cursor postion tracking
  const mouse = useRef({ x: 0, y: 0 });
  const postion = useRef({ x: 0, y: 0 });

  //  Custom cursor
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    document.addEventListener("mousemove", handleMouseMove);

    // Custom cursor animation
    const animate = () => {
      postion.current.x += (mouse.current.x - postion.current.x) * 0.1;
      postion.current.y += (mouse.current.y - postion.current.y) * 0.1;

      if (dotRef.current && outlineRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x - 6}px, ${mouse.current.y - 6}px, 0)`;

        outlineRef.current.style.transform = `translate3d(${postion.current.x - 20}px, ${postion.current.y - 20}px, 0)`;
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="dark:bg-black relative">
      <Navbar theme={theme} setTheme={setTheme} />
      <Hero />
      <TrustedBy />
      <Services />
      <OurWork />
      <Teams />
      <ContactUs />
      <Footer theme={theme} />

      {/* Custom Cursor Ring */}
      <div
        ref={outlineRef}
        className="fixed top-0 left-0 h-10 w-10 rounded-full border border-primary pointer-events-none z-9999"
        style={{ transition: "transform 0.1s ease-out" }}
      ></div>

      {/* Custom Cursor Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 h-3 w-3 rounded-full bg-primary pointer-events-none z-9999"
      ></div>
    </div>
  );
};

export default App;
