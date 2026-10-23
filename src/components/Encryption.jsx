import React from 'react';
import { motion } from 'framer-motion';
import { slideInFromTop } from '../lib/motion';

const Encryption = () => {
  return (
    <div className="flex flex-col relative items-center justify-center min-h-[70vh] sm:min-h-screen w-full h-full overflow-hidden my-10">
      {/* Title */}
      <div className="absolute w-auto h-auto top-6 sm:top-12 z-[5] px-4 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideInFromTop}
          className="text-3xl sm:text-5xl font-extrabold text-center text-gray-200 tracking-tight"
        >
          Performance{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-indigo-400 to-cyan-500">
            &amp;
          </span>{' '}
          security.
        </motion.div>
      </div>

      {/* Lock Graphic Container */}
      <div className="flex flex-col items-center justify-center z-[20] w-auto h-auto mt-16 sm:mt-24">
        <div className="flex flex-col items-center group cursor-pointer w-auto h-auto transition-transform hover:scale-105">
          <img
            src="/lock-top.png"
            alt="Lock top"
            width={50}
            height={50}
            className="translate-y-5 transition-all duration-300 group-hover:translate-y-10 filter drop-shadow-[0_0_15px_rgba(168,85,247,0.7)]"
          />
          <img
            src="/lock-main.png"
            alt="Lock main"
            width={72}
            height={72}
            className="z-10 filter drop-shadow-[0_0_20px_rgba(112,66,248,0.8)]"
          />
        </div>

        <div className="Welcome-box px-[18px] py-[5px] z-[20] border my-[20px] border-[#7042F88B] opacity-[0.95]">
          <h2 className="Welcome-text text-[13px] font-semibold">Encryption &amp; Reliability</h2>
        </div>
      </div>

      {/* Cursive Tagline */}
      <div className="absolute z-[20] bottom-8 sm:bottom-16 px-4 text-center">
        <div className="cursive text-xl sm:text-3xl font-medium text-center text-purple-200/90 tracking-wide drop-shadow-[0_0_12px_rgba(192,132,252,0.5)]">
          Secure your data with end-to-end encryption.
        </div>
      </div>

      {/* Background Cyber Waves Video */}
      <div className="w-full flex items-start justify-center absolute inset-0 -z-10 pointer-events-none opacity-80">
        <video
          loop
          muted
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/encryption-bg.webm" type="video/webm" />
        </video>
      </div>
    </div>
  );
};

export default Encryption;
