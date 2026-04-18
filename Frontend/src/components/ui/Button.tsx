import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  size?: 'md' | 'lg' | 'xl'
  children: ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'lg', className = '', children, ...props }, ref) => {
    const base =
      'font-geologica font-bold uppercase tracking-widest rounded-2xl transition-all duration-300 active:scale-[0.98] focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-md'
    const variants = {
      primary: 'bg-[#ffd646] text-[#0a0a0c] hover:bg-[#ffe373] hover:shadow-[0_0_25px_rgba(255,214,70,0.4)] hover:-translate-y-1 focus:ring-[#ffd646]/50',
      secondary: 'bg-[#081856] text-[#fff6f1] border-2 border-[#085bb9] hover:bg-[#085bb9] hover:shadow-[0_0_20px_rgba(8,91,185,0.4)] hover:-translate-y-1 focus:ring-[#085bb9]/50',
    }
    const sizes = {
      md: 'py-4 px-6 text-lg',
      lg: 'py-6 px-8 text-2xl',
      xl: 'py-8 px-8 text-3xl w-full',
    }
    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    )
  },
)
Button.displayName = 'Button'
export default Button
