import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import BaseLayout from "@/layouts/BaseLayout.tsx";
import Home from "@/views/home.tsx";
import NotFound from "@/views/not-found.tsx";
import FieldsOfStudy from "@/views/fields-of-study.tsx";
import Universities from "@/views/universities.tsx";
import BasicInfo from "@/views/basic-info.tsx";
import CareerAssistant from "@/views/career-assistant.tsx";
import Favorites from "./views/favorites";
import Tinder from "@/components/tinder.tsx";

export default createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<BaseLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/basic-info" element={<BasicInfo />} />
            <Route path="/fields-of-study" element={<FieldsOfStudy />} />
            <Route path="/assistant" element={<CareerAssistant />} />
            <Route path="/universities" element={<Universities />} />
            <Route path="/swipe" element={<Tinder />} />
            <Route path="/favorites" element={<Favorites />} />
        </Route>
    )
);