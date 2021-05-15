import React from "react";
import { MotionBox } from "./MotionBox";

export const AnimatedIntroCard = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <MotionBox
      borderWidth="1px"
      rounded="lg"
      shadow="1px 1px 3px rgba(0,0,0,0.3)"
      p={16}
    >
      {children}
    </MotionBox>
  );
};
