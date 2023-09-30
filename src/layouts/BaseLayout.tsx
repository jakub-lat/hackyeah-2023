import {Outlet} from "react-router-dom";

export default function BaseLayout() {
    return <div>
        <h1>Wyszukiwarka</h1>
        <Outlet />
    </div>
}