import React, { useState, useRef, useEffect } from 'react';

interface FloatingShapeProps {
  initialX: string;
  initialY: string;
  rotation?: number;
  floatDuration?: string;
  zIndex?: number;
  children: React.ReactNode;
  className?: string;
}

export const FloatingShape: React.FC<FloatingShapeProps> = ({
  initialX,
  initialY,
  rotation = 0,
  floatDuration = '6s',
  zIndex = 1,
  children,
  className = '',
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    const touch = e.touches[0];
    setDragOffset({
      x: touch.clientX - position.x,
      y: touch.clientY - position.y,
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      setPosition({
        x: touch.clientX - dragOffset.x,
        y: touch.clientY - dragOffset.y,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const containerStyle: React.CSSProperties = {
    position: 'absolute',
    left: initialX,
    top: initialY,
    transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg)`,
    zIndex: zIndex,
    transition: isDragging ? 'none' : 'transform 0.1s ease-out',
    '--rot': `${rotation}deg`,
    '--duration': floatDuration,
  } as React.CSSProperties;

  return (
    <div
      ref={elementRef}
      style={containerStyle}
      className={`floating-shape-container ${isDragging ? '' : 'animate-float'} ${className}`}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {children}
    </div>
  );
};

export default FloatingShape;
