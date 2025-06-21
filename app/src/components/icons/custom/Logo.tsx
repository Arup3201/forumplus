const LogoIcon = ({ className, size = 40 }: { className?: string; size?: number }) => {
    return <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      className={className}
      aria-label="ForumPlus Logo"
    >
      <rect width="40" height="40" rx="8" className="fill-primary" />
      <text 
        x="50%" 
        y="50%" 
        textAnchor="middle" 
        dy="0.3em" 
        className="fill-primary-foreground font-bold text-lg"
      >
        F+
      </text>
    </svg>
};

export default LogoIcon;