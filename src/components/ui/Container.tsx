import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn(
      'flex flex-col min-h-screen',
      'pt-16',
      'px-4', 
      className
    )}>
      {children}
    </div>
  );
}
