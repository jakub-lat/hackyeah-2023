import {Link, NavLink} from "react-router-dom";
import {cn} from "@/lib/utils"
import {ComponentProps} from "react";
import {ThemeToggle} from "@/components/theme-toggle.tsx";
import {appName} from "@/lib/const.ts";
import UserDropdown from "@/components/user-dropdown.tsx";

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
        <div className="p-6">
            <div className="flex h-16 items-center px-4">
                <nav
                    className={cn("flex items-center space-x-4 lg:space-x-6", className)}
                    {...props}
                >
                    <Link to={"/"} className={cn("font-bold text-3xl")}>
                        {appName}
                    </Link>

                </nav>

                <div className="ml-auto flex items-center space-x-4">
                    <ThemeToggle />
                    <UserDropdown />
                </div>

            </div>
            <div className="grid grid-cols-3 divider-x px-4">
                <NavItem className="font-radio-canada" to={"/fields-of-study"}>Znajdź kierunki</NavItem>
                <NavItem className="font-radio-canada" to={"/universities"}>Znajdź uczelnie</NavItem>
                <NavItem className="font-radio-canada" to={"/favorites"}>Ulubione</NavItem>
            </div>
        </div>

    )
}