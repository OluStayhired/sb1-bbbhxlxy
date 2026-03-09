// src/components/TypingEffect.tsx

import React, { useState, useEffect } from 'react';

interface TypingEffectProps {
  text: string; // The full text to be displayed with a typing effect
  speed?: number; // Optional: Speed of typing in milliseconds per character (default to 50ms)
  onComplete?: () => void; // Optional: Callback function when typing is complete
}

export function TypingEffect({ text, speed = 50, onComplete }: TypingEffectProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Preprocess text to add line breaks after every 2 sentences
  const processedText = React.useMemo(() => {
    // Split by sentence endings (., !, ?)
    const sentences = text.split(/(?<=[.!?])\s+/);
    let result = '';
    
    sentences.forEach((sentence, index) => {
      result += sentence;
      // Add line break after every 2 sentences
      if ((index + 1) % 2 === 0 && index !== sentences.length - 1) {
        result += '\n\n';
      } else if (index !== sentences.length - 1) {
        result += ' ';
      }
    });
    
    return result;
  }, [text]);

  useEffect(() => {
    if (currentIndex < processedText.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText((prev) => prev + processedText[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeoutId); // Cleanup the timeout if the component unmounts or props change
    } else {
      // Typing is complete
      if (onComplete) {
        onComplete();
      }
    }
  }, [processedText, speed, currentIndex, onComplete]); // Re-run effect when text, speed, or currentIndex changes

  // Preserve line breaks by using white-space: pre-wrap
  return <span style={{ whiteSpace: 'pre-wrap' }}>{displayedText}</span>;
}
