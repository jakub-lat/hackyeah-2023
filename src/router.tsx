import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import BaseLayout from "@/layouts/BaseLayout.tsx";
import Home from "@/views/Home.tsx";
import NotFound from "@/views/not-found.tsx";

export default createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<BaseLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
        </Route>
    )
);