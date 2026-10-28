import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { slideInFromLeft, slideInFromRight, slideInFromTop } from '../lib/motion';

const SKILL_DATA = [
  { name: 'HTML', image: 'html.png', width: 70, height: 70 },
  { name: 'CSS', image: 'css.png', width: 70, height: 70 },
  { name: 'JavaScript', image: 'js.png', width: 60, height: 60 },
  { name: 'Tailwind CSS', image: 'tailwind.png', width: 70, height: 70 },
  { name: 'React', image: 'react.png', width: 70, height: 70 },
  { name: 'WordPress', image: 'wordpress.svg', width: 70, height: 70 },
  { name: 'Shopify', image: 'shopify.svg', width: 70, height: 70 },
  { name: 'n8n', image: 'n8n.svg', width: 70, height: 70 },
  { name: 'Hostinger', image: 'hostinger.svg', width: 70, height: 70 },
  { name: 'WooCommerce', image: 'woocommerce.svg', width: 70, height: 70 },
  { name: 'AI Automation', image: 'ai-automation.svg', width: 70, height: 70 },
  { name: 'Node.js', image: 'node.png', width: 70, height: 70 },
  { name: 'MongoDB', image: 'mongodb.png', width: 40, height: 40 },
];

const FRONTEND_SKILL = [
  { name: 'HTML', image: 'html.png', width: 70, height: 70 },
  { name: 'CSS', image: 'css.png', width: 70, height: 70 },
  { name: 'JavaScript', image: 'js.png', width: 60, height: 60 },
  { name: 'Tailwind CSS', image: 'tailwind.png', width: 70, height: 70 },
  { name: 'WordPress', image: 'wordpress.svg', width: 70, height: 70 },
  { name: 'Shopify', image: 'shopify.svg', width: 70, height: 70 },
  { name: 'n8n', image: 'n8n.svg', width: 70, height: 70 },
  { name: 'Hostinger', image: 'hostinger.svg', width: 70, height: 70 },
  { name: 'WooCommerce', image: 'woocommerce.svg', width: 70, height: 70 },
  { name: 'AI Automation', image: 'ai-automation.svg', width: 70, height: 70 },
];

const BACKEND_SKILL = [
  { name: 'Node.js', image: 'node.png', width: 70, height: 70 },
  { name: 'Express.js', image: 'express.png', width: 70, height: 70 },
  { name: 'WordPress', image: 'wordpress.svg', width: 70, height: 70 },
  { name: 'Shopify', image: 'shopify.svg', width: 70, height: 70 },
  { name: 'n8n', image: 'n8n.svg', width: 65, height: 65 },
  { name: 'Hostinger', image: 'hostinger.svg', width: 65, height: 65 },
  { name: 'WooCommerce', image: 'woocommerce.svg', width: 65, height: 65 },
  { name: 'AI Automation', image: 'ai-automation.svg', width: 70, height: 70 },
];

const FULLSTACK_SKILL = [
  { name: 'React Native', image: 'reactnative.png', width: 65, height: 65 },
  { name: 'Tauri', image: 'tauri.png', width: 65, height: 65 },
  { name: 'Docker', image: 'docker.png', width: 65, height: 65 },
  { name: 'Figma', image: 'figma.png', width: 50, height: 50 },
];

const OTHER_SKILL = [
  { name: 'Go', image: 'go.png', width: 55, height: 55 },
];

const SkillItem = ({ src, name, width, height, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.05, duration: 0.4 }}
    whileHover={{ scale: 1.15 }}
    className="flex items-center justify-center p-2 rounded-xl hover:bg-white/[0.04] transition-all cursor-pointer"
    title={name}
  >
    <img
      src={`/skills/${src}`}
      width={width}
      height={height}
      alt={name}
      className="object-contain filter drop-shadow-[0_0_10px_rgba(112,66,248,0.3)]"
      loading="lazy"
    />
  </motion.div>
);

const Skills = () => {
  return (
    <section
      id="skills"
      className="flex flex-col items-center justify-center gap-4 h-full relative overflow-hidden py-24 px-4 max-w-7xl mx-auto"
    >
      {/* Skill Title & Taglines */}
      <div className="w-full h-auto flex flex-col items-center justify-center text-center z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[12px] border border-[#7042f88b] opacity-[0.95]"
        >
          <Sparkles className="text-[#b49bff] mr-[10px] h-4 w-4" />
          <span className="Welcome-text text-[13px] font-semibold">
            High Performance Modern Tech Stack
          </span>
        </motion.div>

        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideInFromLeft(0.3)}
          className="text-3xl sm:text-4xl text-white font-extrabold mt-[14px] text-center tracking-tight"
        >
          Making apps with modern technologies.
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideInFromRight(0.3)}
          className="cursive text-xl sm:text-2xl text-purple-300/80 mb-8 mt-[10px] text-center tracking-wide"
        >
          Never miss a task, deadline or idea.
        </motion.div>
      </div>

      {/* Skills Rows */}
      <div className="flex flex-row justify-center flex-wrap gap-4 sm:gap-6 items-center z-10 max-w-5xl">
        {SKILL_DATA.map((skill, i) => (
          <SkillItem key={`s1-${skill.name}`} src={skill.image} name={skill.name} width={skill.width} height={skill.height} index={i} />
        ))}
      </div>

      <div className="flex flex-row justify-center flex-wrap gap-4 sm:gap-6 items-center z-10 max-w-5xl mt-2">
        {FRONTEND_SKILL.map((skill, i) => (
          <SkillItem key={`s2-${skill.name}-${i}`} src={skill.image} name={skill.name} width={skill.width} height={skill.height} index={i} />
        ))}
      </div>

      <div className="flex flex-row justify-center flex-wrap gap-4 sm:gap-6 items-center z-10 max-w-5xl mt-2">
        {BACKEND_SKILL.map((skill, i) => (
          <SkillItem key={`s3-${skill.name}`} src={skill.image} name={skill.name} width={skill.width} height={skill.height} index={i} />
        ))}
      </div>

      <div className="flex flex-row justify-center flex-wrap gap-4 sm:gap-6 items-center z-10 max-w-5xl mt-2">
        {FULLSTACK_SKILL.map((skill, i) => (
          <SkillItem key={`s4-${skill.name}`} src={skill.image} name={skill.name} width={skill.width} height={skill.height} index={i} />
        ))}
        {OTHER_SKILL.map((skill, i) => (
          <SkillItem key={`s5-${skill.name}`} src={skill.image} name={skill.name} width={skill.width} height={skill.height} index={i + 4} />
        ))}
      </div>

      {/* Cosmic Skills Background Video */}
      <div className="w-full h-full absolute inset-0 -z-10 pointer-events-none opacity-30 flex items-center justify-center">
        <video
          className="w-full h-full object-cover"
          preload="none"
          playsInline
          loop
          muted
          autoPlay
        >
          <source src="/videos/skills-bg.webm" type="video/webm" />
        </video>
      </div>
    </section>
  );
};

export default Skills;
