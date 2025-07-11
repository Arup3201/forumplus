interface NavItem {
    id: string, 
    link: string, 
    title: string
}

interface NavItemsProps {
    items: NavItem[]
}

export type { NavItemsProps };