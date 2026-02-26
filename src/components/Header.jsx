import React from "react";
import { motion } from "framer-motion";
import Img from "../assets/img2.png";

export default function Hero() {

  // animation variants
  const zoomOut = {
    hidden: {
      scale: 1.2,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.9,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="w-full min-h-screen flex bg-gradient-to-br from-white via-purple-50 to-purple-50 items-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-10 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          variants={zoomOut}
          initial="hidden"
          animate="visible"
          className="text-center lg:text-left"
        >
          <h6 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="bg-gradient-to-br from-pink-800 to-black bg-clip-text text-transparent">
              Welcome
            </span>{" "}
            to{" "}
            <span className="bg-gradient-to-br from-black to-purple-800  bg-clip-text text-transparent">
              BlessedNice
            </span>
            <br />
            <span className="bg-gradient-to-bl from-purple-600 to-black bg-clip-text text-transparent">
              Digital
            </span>{" "}
            <span className="bg-gradient-to-bl from-pink-800 to-black bg-clip-text text-transparent">World</span>
            
          </h6>

          <p className="mt-6 text-gray-800 text-lg max-w-xl mx-auto lg:mx-0">
            Discover the ultimate path to financial freedom with our
            comprehensive Affiliate Marketing course. Whether you're just
            starting or looking to scale your income, our step-by-step training
            will equip you with the knowledge and tools to succeed in the
            digital economy.
          </p>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 px-6 py-4 rounded-full text-white font-semibold
            bg-gradient-to-r from-black via-purple-700 to-black
            shadow-lg"
          >
            Enroll Now
          </motion.button>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          variants={zoomOut}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="flex justify-center lg:justify-end"
        >
          <motion.img
            src={Img}
            alt="Hero"
            className="w-full max-w-md lg:max-w-lg object-contain"
            animate={{ scale: [1.1, 1] }}
            transition={{ duration: 1 }}
          />
        </motion.div>

      </div>
    </section>
  );
}