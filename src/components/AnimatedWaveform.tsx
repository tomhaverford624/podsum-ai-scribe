
import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

const AnimatedWaveform: React.FC = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: false });
  
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  // Create 12 bars with varying heights
  const bars = Array.from({ length: 12 }).map((_, i) => ({
    initialHeight: Math.random() * 40 + 20,
    delay: i * 0.05,
  }));

  return (
    <motion.div 
      ref={ref}
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-[0.15]"
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1 },
        hidden: { opacity: 0 }
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-end space-x-2">
        {bars.map((bar, index) => (
          <motion.div
            key={index}
            className="w-2 bg-gradient-to-t from-alea-blue to-blue-400 rounded-t-full"
            initial={{ height: 10 }}
            animate={{ 
              height: [
                bar.initialHeight, 
                bar.initialHeight + Math.random() * 30,
                bar.initialHeight,
                bar.initialHeight + Math.random() * 20,
                bar.initialHeight
              ] 
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: bar.delay,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default AnimatedWaveform;
