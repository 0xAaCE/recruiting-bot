import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AuthGate } from "./components/auth/AuthGate";
import { ChatPage } from "./pages/ChatPage";
import { LandingPage } from "./pages/LandingPage";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route
                    path="/chat"
                    element={
                        <AuthGate>
                            <ChatPage />
                        </AuthGate>
                    }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
);
