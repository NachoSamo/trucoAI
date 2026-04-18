import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  size?: 'md' | 'lg' | 'xl'
  children: ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'lg', className = '', children, ...props }, ref) => {
    const base =
      'font-bold uppercase tracking-widest rounded-2xl transition-all active:scale-95 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3'
    const variants = {
      primary: 'bg-yellow-400 text-black focus:ring-yellow-300',
      secondary: 'bg-gray-800 text-yellow-400 border-2 border-yellow-400 focus:ring-yellow-700',
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
