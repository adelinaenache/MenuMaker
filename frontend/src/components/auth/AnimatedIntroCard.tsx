import React from 'react';
import { Box } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

const AnimatedBox = motion(Box);

export const AnimatedIntroCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <AnimatePresence>
      <AnimatedBox
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        p={16}
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </AnimatedBox>
    </AnimatePresence>
  );
};
