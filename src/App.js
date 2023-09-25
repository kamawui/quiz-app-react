import {BrowserRouter, Routes, Route} from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import NoPage from "./pages/NoPage";
import "./app.css";

function App() {
    return (
        <div className="app-wrapper">
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home />}/>
                    <Route path="/home" element={<Home />}/>
                    <Route path="/quiz" element={<Quiz />}/>
                    <Route path="/*" element={<NoPage />}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;