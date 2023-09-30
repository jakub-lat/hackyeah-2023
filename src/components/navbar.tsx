import {Link, NavLink} from "react-router-dom";
import {cn} from "@/lib/utils"
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import { User } from "lucide-react"
import {ComponentProps} from "react";
import {ThemeToggle} from "@/components/theme-toggle.tsx";
import {appName} from "@/lib/const.ts";

function NavItem({...props}: ComponentProps<typeof NavLink>) {
    return <NavLink
        className={({ isActive }) => {
            return cn("text-sm font-medium transition-colors hover:text-primary", { "text-muted-foreground": !isActive });
        }}
        {...props}
    />
}

export function Navbar({
                           className,
                           ...props
                       }: React.HTMLAttributes<HTMLElement>) {
    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <nav
                    className={cn("flex items-center space-x-4 lg:space-x-6", className)}
                    {...props}
                >
                    <Link to={"/"} className={cn("font-bold")}>
                        {appName}
                    </Link>
                    <NavItem to={"/fields-of-study"}>Znajdź kierunki</NavItem>
                    <NavItem to={"/universities"}>Znajdź uczelnie</NavItem>
                    <NavItem to={"/favorites"}>Ulubione</NavItem>
                </nav>

                <div className="ml-auto flex items-center space-x-4">
                    <ThemeToggle />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                <User className={"mr-2 h-4 w-4"} />
                                Jan Kowalski
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>Moje konto</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    Mój profil
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    Wyloguj się
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>

    )
}