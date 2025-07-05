import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";


const Discussions = () => {
    return (
        <main className="flex flex-col gap-2 p-4">
            <h2>Discussions</h2>
            <p>Join the conversion and share your thoughts to the community</p>

            <div className="flex gap-1">
                <DropdownMenu>
                    <DropdownMenuTrigger className="btn btn-primary">Category</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>General</DropdownMenuItem>
                        <DropdownMenuItem>Help</DropdownMenuItem>
                        <DropdownMenuItem>Ideas</DropdownMenuItem>
                        <DropdownMenuItem>Development</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger className="btn btn-primary">Sort By</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Title</DropdownMenuItem>
                        <DropdownMenuItem>Replies</DropdownMenuItem>
                        <DropdownMenuItem>Views</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            
            <ul>
                
            </ul>
        </main>
    );
}