interface LogoProps {
  size?: number
  className?: string
}

export default function Logo({ size = 44, className = '' }: LogoProps) {
  return (
    <img
      src="/Logo%20(2).svg"
      alt="Cómplice AI"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    />
  )
}
