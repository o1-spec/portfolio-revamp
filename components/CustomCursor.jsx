'use client';

import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (isMobile) return;

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };
    
    // Add mouse down/up event handlers
    const handleMouseDown = () => {
      setIsClicking(true);
    };
    
    const handleMouseUp = () => {
      setIsClicking(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    document.body.style.cursor = 'none';

    if (isMobile) return null;

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('resize', checkMobile);
      document.body.style.cursor = 'auto';
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div
        className={`fixed pointer-events-none z-[9999] transition-opacity duration-200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Inner cursor */}
        <div 
          className={`transition-all duration-150 ease-out`}
          style={{
            width: isClicking ? '12px' : '20px',
            height: isClicking ? '12px' : '20px',
            backgroundColor: 'black',
            borderRadius: '50%',
            boxShadow: '0 0 0 3px white, 0 0 0 4px rgba(0,0,0,0.3)',
            transform: isClicking ? 'scale(0.6)' : 'scale(1)',
          }}
        />
        
        {/* Click animation ring */}
        {isClicking && (
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/2 left-1/2 w-24 h-24 border-2 border-white rounded-full opacity-0 animate-cursor-click-ring"></div>
          </div>
        )}
      </div>
      
      <style jsx global>{`
        @keyframes cursorClickRing {
          0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 0.8;
          }
          100% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
          }
        }
        
        .animate-cursor-click-ring {
          animation: cursorClickRing 0.6s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default CustomCursor;