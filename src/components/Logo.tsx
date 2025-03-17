interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export function Logo({ className, width = 61, height = 55 }: LogoProps) {
  return (
    <img
      src="/logo.png"
      alt="Logo"
      width={width}
      height={height}
      className={className}
    />
  );
}