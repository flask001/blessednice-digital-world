import Logo from "../assets/Logo.png";
import { motion, useSpring } from "framer-motion";
import useDeviceTilt from "../hooks/useDeviceTilt";

export default function Footer() {
  const tilt = useDeviceTilt();

  const springX = useSpring(tilt.x, {
    stiffness: 120,
    damping: 15,
    mass: 0.5,
  });

  const springY = useSpring(tilt.y, {
    stiffness: 120,
    damping: 15,
    mass: 0.5,
  });

  return (
    <footer className="bg-gradient-to-tl from-black to-purple-950/100  text-gray-50 py-8 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Animated Branding */}
        <motion.div
          style={{
            rotateX: springX,
            rotateY: springY,
          }}
          className="flex items-center gap-4 text-center md:text-left"
        >
          {/* Logo Layer (deeper) */}
          <motion.img
            src={Logo}
            alt="Blessednice Digital World Logo"
            className="w-14 h-14"
            style={{
              translateZ: -20,
            }}
          />

          {/* Brand Text Layer (closer) */}
          <motion.div
            style={{
              translateZ: 20,
            }}
          >
            <h2 className="text-xl font-semibold bg-gradient-to-r from-pink-400 via-white to-purple-200 bg-clip-text text-transparent">
              Blessednice Digital world
            </h2>
            <p className="text-sm text-gray-400">
              Your path to massive income
            </p>
          </motion.div>
        </motion.div>

        {/* Navigation */}
        <nav className="flex gap-6 text-sm font-medium">
          <a href="#about" className="hover:text-pink-300 transition-colors">
            About
          </a>
          <a href="#courses" className="hover:text-pink-300 transition-colors">
            Courses
          </a>
          <a href="#blog" className="hover:text-pink-300 transition-colors">
            Blog
          </a>
          <a href="#contact" className="hover:text-pink-300 transition-colors">
            Contact
          </a>
        </nav>
      </div>

      <div className="mt-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Affiliate Mastery. All rights reserved.
      </div>
    </footer>
  );
}