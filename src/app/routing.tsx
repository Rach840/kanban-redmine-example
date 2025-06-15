import {Route, Routes} from "react-router";
import Home from "../pages/Home";

export function Routing() {
    return (
        <Routes>
            <Route index element={<Home />} />
        </Routes>
    )
}