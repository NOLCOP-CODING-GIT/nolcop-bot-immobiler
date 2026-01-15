import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NolcopBotImmo from "./components/NolcopBotImmo";
import Navbar from "./components/Navbar";
import { EntrepriseInfo } from "./data/entrepriseData";
import HomePage from "./pages/HomePage";
import AchatPage from "./pages/AchatPage";
import LocationPage from "./pages/LocationPage";
import ContactPage from "./pages/ContactPage";
import ConfigPage from "./pages/ConfigPage";

const App = () => {
  const [entrepriseData, setEntrepriseData] = useState<EntrepriseInfo | null>(
    null
  );

  // Charger les données sauvegardées au démarrage
  React.useEffect(() => {
    const savedData = localStorage.getItem("entrepriseData");
    if (savedData) {
      try {
        setEntrepriseData(JSON.parse(savedData));
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      }
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-purple-50">
        <Navbar />

        <main className="pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/achat" element={<AchatPage />} />
            <Route path="/location" element={<LocationPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/config" element={<ConfigPage />} />
          </Routes>
        </main>

        <NolcopBotImmo entrepriseData={entrepriseData} />
      </div>
    </Router>
  );
};

export default App;
