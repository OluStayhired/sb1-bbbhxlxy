// src/utils/TooltipHelp.tsx
import React, { useState, useRef, useEffect, ReactNode, useCallback } from 'react';
import ReactDOM from 'react-dom'; // Import ReactDOM

interface TooltipBoundaryProps {
  text: string;
  children: ReactNode;
  bgColor?: string;
  textColor?: string;
  className?: string;
  show?: boolean;
  
}

export function TooltipBoundary({ text, children, bgColor = 'gray-900', textColor = 'white', className, show = true }: TooltipExtendedProps) {
  // State to manage the tooltip's visibility
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<'left' | 'center' | 'right'>('center');
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Calculate tooltip position to prevent overflow
  useEffect(() => {
    if (isTooltipVisible && containerRef.current && tooltipRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const tooltipWidth = 200; // Match the w-[200px] class
      const viewportWidth = window.innerWidth;
      const padding = 16; // Padding from screen edge

      // Calculate potential positions
      const centerPosition = containerRect.left + (containerRect.width / 2) - (tooltipWidth / 2);
      const leftEdge = centerPosition;
      const rightEdge = centerPosition + tooltipWidth;

      // Determine best position
      if (leftEdge < padding) {
        // Too close to left edge, align tooltip to left
        setTooltipPosition('left');
      } else if (rightEdge > viewportWidth - padding) {
        // Too close to right edge, align tooltip to right
        setTooltipPosition('right');
      } else {
        // Safe to center
        setTooltipPosition('center');
      }
    }
  }, [isTooltipVisible]);

  // Only allow visibility change if the 'show' prop is true
  const handleMouseEnter = () => {
    if (show) {
      setIsTooltipVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (show) {
      setIsTooltipVisible(false);
    }
  };

  // Determine positioning classes based on calculated position
  const getPositionClasses = () => {
    switch (tooltipPosition) {
      case 'left':
        return 'left-0';
      case 'right':
        return 'right-0';
      case 'center':
      default:
        return 'left-1/2 transform -translate-x-1/2';
    }
  };
  
  return (
    // Apply onMouseEnter and onMouseLeave directly to this container
    <div
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children} 
      
      {show && (
      <div
        ref={tooltipRef}
        className={`absolute z-9999 bottom-full mb-2
                   bg-${bgColor} text-${textColor} text-xs rounded-md py-1 px-2
                    shadow-lg w-[200px]  
                   ${isTooltipVisible ? 'opacity-100' : 'opacity-0'}
                   transition-opacity duration-300 pointer-events-none
                   ${getPositionClasses()}
                   ${className || ''} whitespace-pre-line`}
      >
        
        {text}
        
      </div>
      )}
    </div>
  );
  
}
