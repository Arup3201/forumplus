const SPACING = {
    xs: "gap-1",
    sm: "gap-2", 
    md: "gap-4", 
    lg: "gap-6", 
    xl: "gap-8", 
} as const;

const COLORS = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    destructive: 'bg-red-600 text-white hover:bg-red-700'
} as const;

export { SPACING, COLORS };