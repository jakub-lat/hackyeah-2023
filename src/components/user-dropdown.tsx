import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {LogIn, User} from "lucide-react";
import {auth} from "@/lib/firebase.ts";
import {useAuthState} from "react-firebase-hooks/auth";


export default function UserDropdown() {
    const [user] = useAuthState(auth);

    // TODO logowanie

    if (!user) {
        return <Button variant={"outline"}>
            Login
            <LogIn className={"w-4 h-4 ml-2"} />
        </Button>
    }

    return <>
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

    </>
}