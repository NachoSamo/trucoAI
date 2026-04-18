interface LogoProps {
  size?: number
  className?: string
}

export default function Logo({ size = 44, className = '' }: LogoProps) {
  return (
    <img
      src="/logo.svg"
      alt="Cómplice AI"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    />
  )
}
