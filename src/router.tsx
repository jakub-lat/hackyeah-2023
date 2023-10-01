import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import BaseLayout from "@/layouts/BaseLayout.tsx";
import Home from "@/views/home.tsx";
import NotFound from "@/views/not-found.tsx";
import FieldsOfStudy from "@/views/fields-of-study.tsx";
import Universities from "@/views/universities.tsx";
import BasicInfo from "@/views/basic-info.tsx";
import CareerAssistant from "@/views/career-assistant.tsx";
import University from "./views/university";
import Favorites from "./views/favorites";

export default createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<BaseLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/basic-info" element={<BasicInfo />} />
            <Route path="/fields-of-study" element={<FieldsOfStudy />} />
            <Route path="/fields-of-study/assistant" element={<CareerAssistant />} />
            <Route path="/universities" element={<Universities />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/university" element={<University univ={{
                name: "1",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consectetur, magna id semper euismod, elit lorem egestas neque, blandit scelerisque nibh nunc nec risus. Aliquam sagittis congue diam, nec tempus risus mattis id. Curabitur congue sem elit, sit amet vestibulum leo semper sit amet. In neque lectus, ultrices vitae sagittis.",
                fieldsOfStudy: ["Lokalizacja", "Informatyka"],
                rating: 2137,
                comments: []
            }} />} />
        </Route>
    )
);