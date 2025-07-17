import { cn } from '@/lib/utils'
import type { SeachboxProps } from '@/types/components/searchbox'
import { Icons } from "./icons"
import { Input } from "./ui/input"

const Searchbox = ({
    size,
    placeholder = "Search",
    className = "",
    onChange = () => {}
}: SeachboxProps) => {
    return <div className={cn("flex gap-1 items-center px-2 py-0 border-2 border-gray-200 rounded-4xl", className)}>
        <Icons.Search size={size} className="text-gray-400" />
        <Input className="w-full bg-transparent border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0" placeholder={placeholder} onChange={onChange} />
    </div>
}

export default Searchbox;