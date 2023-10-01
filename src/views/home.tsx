import { Button } from "@/components/ui/button.tsx";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { appName } from "@/lib/const.ts";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase.ts";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const [user] = useAuthState(auth);
    const [signInWithGoogle, _, _error] = useSignInWithGoogle(auth);
    const navigate = useNavigate();

    return <div className={"h-[75vh] flex items-center justify-center gap-x-16"}>
        <img src="/icon.png" className="aspect-square" />
        <div className={"flex flex-col items-center justify-around"}>
            <div className={"text-center flex flex-col"}>

                <h1 className={"text-6xl font-bold mb-4 "}>{appName}</h1>
                <h2 className="text-xl ">Znajdź swoją wymarzoną ścieżkę kariery</h2>
            </div>

            <Button className={"w-64 mt-10 font-bold relative cursor-pointer"} size={"lg"} asChild onClick={() => {
                if (!user)
                    signInWithGoogle()
                        .then(() => navigate("/basic-info"))
            }}>
                {user ? (
                    <Link to={"/basic-info"}>
                        Zaczynamy
                        <ArrowRight className={"w-5 h-5 absolute right-5"} />
                    </Link>
                ) : (
                    <span>
                        Zaczynamy
                        <ArrowRight className={"w-5 h-5 absolute right-5"} />
                    </span>
                )}
            </Button>
        </div>

        <div className="w-[100vw] h-[100vh] absolute bg-red-500 top-0 left-0 opacity-10 -z-10">
            <img className="w-full h-full" src="/background.jpg" alt="" />
        </div>
    </div>
}