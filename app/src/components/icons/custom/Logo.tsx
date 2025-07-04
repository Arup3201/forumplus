const LogoIcon = ({
  className,
  size = 40,
}: {
  className?: string;
  size?: number;
}) => {
  return (
    <img src="/logo.svg" alt="Logo" className={className} width={size} height={size} />
  );
};

export default LogoIcon;
