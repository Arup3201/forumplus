const LogoIcon = ({
  className,
  size = 40,
}: {
  className?: string;
  size?: number;
}) => {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width={size} height={size} rx="8" className="fill-primary" />

      <g
        id="svgGroup"
        strokeLinecap="round"
        fillRule="evenodd"
        stroke="#ffffff"
        strokeWidth="2"
        fill="#ffffff"
        transform="translate(5, 10)"
      >
        <path d="M 1.38 19.77 L 0 19.77 L 0 0 L 11.52 0 L 11.52 1.2 L 1.38 1.2 L 1.38 9.06 L 9.93 9.06 L 9.93 10.26 L 1.38 10.26 L 1.38 19.77 Z M 23.13 16.47 L 21.87 16.47 L 21.87 10.44 L 16.35 10.44 L 16.35 9.3 L 21.87 9.3 L 21.87 3.27 L 23.13 3.27 L 23.13 9.3 L 28.65 9.3 L 28.65 10.44 L 23.13 10.44 L 23.13 16.47 Z" vectorEffect="non-scaling-stroke"/>
      </g>
    </svg>
  );
};

export default LogoIcon;
