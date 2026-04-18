import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, id, ...props }, ref) => {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={inputId} className="text-yellow-400 text-xl font-semibold">
        {label}
      </label>
      <input
        ref={ref}
        id={inputId}
        className={`bg-gray-900 text-white text-xl rounded-xl border-2 px-4 py-4 focus:outline-none focus:ring-4 focus:ring-yellow-400 ${
          error ? 'border-red-500' : 'border-gray-700'
        }`}
        {...props}
      />
      {error && (
        <p role="alert" className="text-red-400 text-base">
          {error}
        </p>
      )}
    </div>
  )
})
Input.displayName = 'Input'
export default Input
