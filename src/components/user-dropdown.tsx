import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {LogIn, User} from "lucide-react";
import {auth} from "@/lib/firebase.ts";
import {useAuthState, useSignInWithGoogle, useSignOut} from "react-firebase-hooks/auth";
import LoadingButton from "@/components/ui/loading-button.tsx";
import {Link} from "react-router-dom";

export default function UserDropdown() {
    // TODO logowanie
    const [user] = useAuthState(auth);
    const [signInWithGoogle, _, loading, _error] = useSignInWithGoogle(auth);

    const [signOut, _signOutLoading] = useSignOut(auth);

    if (!user) {
        return <LoadingButton variant={"outline"} isLoading={loading} onClick={() => signInWithGoogle()}>
            Login
            <LogIn className={"w-4 h-4 ml-2"}/>
        </LoadingButton>
    }

    return <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    <User className={"mr-2 h-4 w-4"}/>
                    {user.displayName}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Moje konto</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuGroup>
                    <DropdownMenuItem className={"cursor-pointer"} asChild>
                        <Link to={"/basic-info"}>
                            Profil
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => signOut()} className={"cursor-pointer mt-2"}>
                        Wyloguj się
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    </>
}