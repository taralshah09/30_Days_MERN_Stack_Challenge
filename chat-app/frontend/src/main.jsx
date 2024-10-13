import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { SocketProvider } from "./context/SocketContext.jsx";

createRoot(document.getElementById("root")).render(

  <BrowserRouter>
    <AuthProvider>
      <SocketProvider>
        <StrictMode>
          <App />
        </StrictMode>
      </SocketProvider>
    </AuthProvider>
  </BrowserRouter>

);
