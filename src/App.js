import "./App.css";
import LoginPage from "./components/loginPageComponent/loginPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Dashboard from "./components/dashboardPageComponent/dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const clientId =
  "991129247780-lcdedv69mpg3p80rhi4pljqfmvq0iifo.apps.googleusercontent.com";
function App() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
