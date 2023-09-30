import {Navbar} from "@/components/navbar.tsx";
import {Outlet} from "react-router-dom";

export default function BaseLayout() {
    return <>
        <div className="flex-col flex">
            <Navbar />
            <Outlet />
        </div>
    </>
}