import React, { ButtonHTMLAttributes } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, HTMLMotionProps } from 'motion/react';
import { useSound } from '../hooks/useSound';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// A large, kid-friendly button
interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost' | '3d' | 'option';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  playSound?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'lg', playSound = true, children, onClick, ...props }, ref) => {
    
    const { playPop } = useSound();

    const variants = {
      primary: 'bg-gradient-to-b from-sky-300 to-sky-500 text-white hover:from-sky-400 hover:to-sky-600 shadow-[0_6px_0_theme(colors.sky.700)] active:shadow-[0_0px_0_theme(colors.sky.700)] active:translate-y-1.5 border-2 border-sky-400',
      secondary: 'bg-gradient-to-b from-purple-300 to-purple-500 text-white hover:from-purple-400 hover:to-purple-600 shadow-[0_6px_0_theme(colors.purple.700)] active:shadow-[0_0px_0_theme(colors.purple.700)] active:translate-y-1.5 border-2 border-purple-400',
      success: 'bg-gradient-to-b from-green-300 to-emerald-500 text-white hover:from-green-400 hover:to-emerald-600 shadow-[0_6px_0_theme(colors.emerald.700)] active:shadow-[0_0px_0_theme(colors.emerald.700)] active:translate-y-1.5 border-2 border-emerald-400',
      danger: 'bg-gradient-to-b from-rose-300 to-rose-500 text-white hover:from-rose-400 hover:to-rose-600 shadow-[0_6px_0_theme(colors.rose.700)] active:shadow-[0_0px_0_theme(colors.rose.700)] active:translate-y-1.5 border-2 border-rose-400',
      ghost: 'bg-transparent text-slate-600 hover:bg-slate-100 shadow-none border-2 border-transparent hover:border-slate-200',
      '3d': 'bg-gradient-to-br from-amber-200 to-amber-400 text-amber-900 border-b-8 border-amber-600 rounded-3xl hover:brightness-110 active:border-b-0 active:translate-y-2',
      'option': 'bg-gradient-to-b from-indigo-100 to-indigo-200 text-indigo-900 border-4 border-indigo-400 rounded-3xl hover:from-indigo-200 hover:to-indigo-300 hover:border-indigo-500 shadow-[0_6px_0_theme(colors.indigo.400)] hover:shadow-[0_6px_0_theme(colors.indigo.500)] active:shadow-[0_0px_0_theme(colors.indigo.500)] active:translate-y-1.5',
    };

    const sizes = {
      sm: 'py-2 px-4 text-sm rounded-xl',
      md: 'py-3 px-6 text-lg rounded-2xl',
      lg: 'py-4 px-8 text-xl font-bold rounded-2xl',
      xl: 'py-6 px-10 text-2xl font-bold rounded-3xl',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        className={cn(
          'inline-flex items-center justify-center transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          className
        )}
        onClick={(e) => {
          if (playSound) playPop();
          if (onClick) onClick(e);
        }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);
Button.displayName = 'Button';

export const Card = ({ className, children, hoverEffect = false, animate = false }: { className?: string, children: React.ReactNode, hoverEffect?: boolean, animate?: boolean }) => {
  const content = (
    <div className={cn(
      'bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border-4 border-white backdrop-blur-sm',
      hoverEffect && 'transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgb(0,0,0,0.12)]',
      className
    )}>
      {children}
    </div>
  );

  if (animate) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
        {content}
      </motion.div>
    );
  }

  return content;
};
