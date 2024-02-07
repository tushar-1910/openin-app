import './App.css';
import LoginPage from './components/loginPageComponent/loginPage';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Dashboard from './components/dashboardPageComponent/dashboard';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const clientId = '467459100384-fj9t4opkhnoa3vjc5mtmgj5ie11mb316.apps.googleusercontent.com'
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
