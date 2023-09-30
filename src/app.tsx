import {ThemeProvider} from "@/components/theme-provider.tsx";
import {RouterProvider} from "react-router-dom";
import router from "@/router.tsx";

export default function App() {
    return <ThemeProvider>
        <RouterProvider router={router} />
    </ThemeProvider>
}