import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AccueilPage from "./pages/AccueilPage";
import ChambresPage from "./pages/ChambresPage";
import ReservationPage from "./pages/ReservationPage";
import ContactPage from "./pages/ContactPage";

const AppContent: React.FC = () => {
  const location = useLocation();

  // Smooth scroll to top when route changes
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="grow">
        <Routes>
          <Route path="/" element={<AccueilPage />} />
          <Route path="/accueil" element={<AccueilPage />} />
          <Route path="/chambres" element={<ChambresPage />} />
          <Route path="/reservation" element={<ReservationPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
