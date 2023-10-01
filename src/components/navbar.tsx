import {Link, NavLink} from "react-router-dom";
import {cn} from "@/lib/utils"
import {ComponentProps} from "react";
import {ThemeToggle} from "@/components/theme-toggle.tsx";
import {appName} from "@/lib/const.ts";
import UserDropdown from "@/components/user-dropdown.tsx";

function NavItem({...props}: ComponentProps<typeof NavLink>) {
    return <NavLink
        className={({ isActive }) => {
            return cn("text-sm  font-medium transition-colors hover:text-primary", { "text-muted-foreground": !isActive });
        }}
        {...props}
    />
}

export function Navbar({
                           className,
                           ...props
                       }: React.HTMLAttributes<HTMLElement>) {
    return (
        <div className="px-7 py-2">
            <div className="flex h-16 items-center px-4">
                <nav
                    className={cn("flex items-center space-x-4 lg:space-x-6", className)}
                    {...props}
                >
                    <Link to={"/"} className={cn("font-bold text-3xl mr-5")}>
                        {appName}
                    </Link>
                    <NavItem to={"/fields-of-study"}>Wybierz kierunki</NavItem>
                    <NavItem to={"/universities"}>Znajdź uczelnie</NavItem>
                    <NavItem to={"/favorites"}>Ulubione</NavItem>
                </nav>

                <div className="ml-auto flex items-center space-x-4">
                    <ThemeToggle />
                    <UserDropdown />
                </div>

            </div>
        </div>

    )
}