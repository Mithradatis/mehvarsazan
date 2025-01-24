'use client'

import React from "react";
import { motion, MotionProps } from "framer-motion";

type MotionComponentType = keyof typeof motion;

interface MotionWrapperProps extends MotionProps {
  type?: MotionComponentType;
  id?: string;
  href?: string;
  className?: string;
  strokeWidth?: number | string;
  strokeLinecap?: 'butt' | 'round' | 'square';
  strokeDasharray?: string;
  strokeDashoffset?: number;
  d?: string;
}

const MotionWrapper = React.forwardRef<HTMLElement, MotionProps & { 
    type?: MotionComponentType 
  }>(({ type = 'div', children, ...props }: MotionWrapperProps, ref: any) => {
    
    const MotionComponent = motion[type] as typeof motion.div;
    return (
      <MotionComponent ref={ref} {...props}>
        {children}
      </MotionComponent>
    )
  });
  
  MotionWrapper.displayName = 'MotionWrapper';
  
  export default MotionWrapper;