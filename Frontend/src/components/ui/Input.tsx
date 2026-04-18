import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, id, ...props }, ref) => {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={inputId} className="text-[#fff6f1] text-lg font-medium ml-1">
        {label}
      </label>
      <input
        ref={ref}
        id={inputId}
        className={`bg-[#fff6f1] text-[#0a0a0c] placeholder-[#0a0a0c]/40 text-xl rounded-xl border-2 px-5 py-4 transition-all focus:outline-none focus:ring-4 focus:ring-[#085bb9]/30 shadow-inner ${
          error ? 'border-[#ED2A2C] focus:border-[#ED2A2C]' : 'border-transparent focus:border-[#085bb9] hover:border-[#085bb9]/50'
        }`}
        {...props}
      />
      {error && (
        <p role="alert" className="text-brand-red text-base">
          {error}
        </p>
      )}
    </div>
  )
})
Input.displayName = 'Input'
export default Input
