import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ChatPage from "./pages/ChatPage";
import AboutPage from "./pages/AboutPage";
import ProfilePage from "./pages/ProfilePage";
import FaqPage from "./pages/FaqPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="h-screen flex flex-col overflow-hidden bg-paper">
          <Navbar />
          <div className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route
                path="/chat"
                element={
                  <ProtectedRoute>
                    <ChatPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
