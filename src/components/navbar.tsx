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
            return cn("text-sm font-radio-canada font-medium transition-colors hover:text-primary", { "text-muted-foreground": !isActive });
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
                    <Link to={"/"} className={cn("font-bold text-3xl")}>
                        {appName}
                    </Link>
                    <NavItem className="font-radio-canada" to={"/fields-of-study"}>Znajdź kierunki</NavItem>
                    <NavItem className="font-radio-canada" to={"/universities"}>Znajdź uczelnie</NavItem>
                    <NavItem className="font-radio-canada" to={"/favorites"}>Ulubione</NavItem>
                </nav>

                <div className="ml-auto flex items-center space-x-4">
                    <ThemeToggle />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="font-radio-canada" variant="outline">
                                <User className={"mr-2 h-4 w-4"} />
                                Jan Kowalski
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel className="font-radio-canada">Moje konto</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem className="font-radio-canada">
                                    Mój profil
                                </DropdownMenuItem>
                                <DropdownMenuItem className="font-radio-canada">
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