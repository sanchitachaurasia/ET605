import React, { useState, useEffect } from 'react';
import { cn } from '../lib/utils';

type ScreenSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export function useResponsive() {
  const [screenSize, setScreenSize] = useState<ScreenSize>('md');
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      if (width < 640) {
        setScreenSize('xs');
        setIsMobile(true);
        setIsTablet(false);
        setIsDesktop(false);
      } else if (width < 768) {
        setScreenSize('sm');
        setIsMobile(true);
        setIsTablet(false);
        setIsDesktop(false);
      } else if (width < 1024) {
        setScreenSize('md');
        setIsMobile(false);
        setIsTablet(true);
        setIsDesktop(false);
      } else if (width < 1280) {
        setScreenSize('lg');
        setIsMobile(false);
        setIsTablet(false);
        setIsDesktop(true);
      } else if (width < 1536) {
        setScreenSize('xl');
        setIsMobile(false);
        setIsTablet(false);
        setIsDesktop(true);
      } else {
        setScreenSize('2xl');
        setIsMobile(false);
        setIsTablet(false);
        setIsDesktop(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { screenSize, isMobile, isTablet, isDesktop };
}

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function ResponsiveContainer({ children, className }: ResponsiveContainerProps) {
  return (
    <div className={cn(
      'mx-auto w-full px-4 sm:px-6 lg:px-8',
      'max-w-7xl',
      className
    )}>
      {children}
    </div>
  );
}

interface AdaptiveGridProps {
  children: React.ReactNode;
  cols?: number;
  className?: string;
}

export function AdaptiveGrid({ children, cols = 3, className }: AdaptiveGridProps) {
  const { isMobile, isTablet } = useResponsive();
  
  let gridClass = `lg:grid-cols-${cols}`;
  if (isMobile) gridClass = 'grid-cols-1';
  else if (isTablet) gridClass = `sm:grid-cols-2 md:grid-cols-${Math.ceil(cols / 2)}`;

  return (
    <div className={cn(
      'grid gap-4 sm:gap-6',
      gridClass,
      className
    )}>
      {children}
    </div>
  );
}

interface FluidSpaceProps {
  children: React.ReactNode;
  className?: string;
}

export function FluidSpace({ children, className }: FluidSpaceProps) {
  const { isMobile } = useResponsive();
  
  return (
    <div className={cn(
      isMobile ? 'space-y-4' : 'space-y-6',
      className
    )}>
      {children}
    </div>
  );
}
