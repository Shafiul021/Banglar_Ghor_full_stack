'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { ChevronsLeftRight } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  aspectRatio?: string; // e.g., "aspect-[16/10]" or "aspect-[4/3]"
  className?: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt = 'Before Renovation',
  afterAlt = 'After Renovation',
  aspectRatio = 'aspect-[16/10]',
  className = '',
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleInteractionEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleInteractionEnd);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleInteractionEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleInteractionEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleInteractionEnd);
    };
  }, [isDragging, handleMouseMove, handleTouchMove, handleInteractionEnd]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderPosition((prev) => Math.min(100, prev + 5));
    }
  };

  return (
    <div
      ref={containerRef}
      role="slider"
      aria-valuenow={Math.round(sliderPosition)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Before and after renovation comparison slider. Use left and right arrow keys to adjust."
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={`relative select-none overflow-hidden rounded-sm cursor-ew-resize focus:outline-none focus:ring-2 focus:ring-[#9E7D4C] ${aspectRatio} ${className}`}
      onMouseDown={(e) => {
        setIsDragging(true);
        handleMove(e.clientX);
      }}
      onTouchStart={(e) => {
        setIsDragging(true);
        handleMove(e.touches[0].clientX);
      }}
    >
      {/* After Image (Full background layer) */}
      <div className="absolute inset-0 w-full h-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={afterImage}
          alt={afterAlt}
          className="w-full h-full object-cover object-center pointer-events-none"
          loading="lazy"
        />
        <div className="absolute bottom-4 right-4 z-10 px-3 py-1 bg-[#1F1E1D]/80 backdrop-blur-md text-[#FAF8F5] text-[11px] uppercase tracking-widest font-medium rounded-sm border border-white/10 pointer-events-none">
          After Renovation
        </div>
      </div>

      {/* Before Image (Clipped overlay) */}
      <div
        className="absolute inset-0 h-full overflow-hidden pointer-events-none"
        style={{ width: `${sliderPosition}%` }}
      >
        <div
          className="absolute inset-0 h-full"
          style={{
            width: containerRef.current
              ? `${containerRef.current.clientWidth}px`
              : '100vw',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={beforeImage}
            alt={beforeAlt}
            className="w-full h-full object-cover object-center pointer-events-none filter sepia-[0.15] contrast-[0.95]"
            loading="lazy"
          />
        </div>
        <div className="absolute bottom-4 left-4 z-10 px-3 py-1 bg-[#1F1E1D]/80 backdrop-blur-md text-[#FAF8F5] text-[11px] uppercase tracking-widest font-medium rounded-sm border border-white/10 pointer-events-none">
          Before Renovation
        </div>
      </div>

      {/* Center Dividing Line & Handle */}
      <div
        className="absolute top-0 bottom-0 z-20 pointer-events-none"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <div className="w-[2px] h-full bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#1F1E1D] text-white border-2 border-white flex items-center justify-center shadow-xl transition-transform hover:scale-110 active:scale-95">
          <ChevronsLeftRight size={18} className="text-[#C9A979]" />
        </div>
      </div>
    </div>
  );
}
