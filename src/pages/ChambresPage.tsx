import React, { useState } from "react";
import { chambresData } from "../data/chambresData";
import ChambreCard from "../components/ChambreCard";
import ReservationForm from "../components/ReservationForm";
import { Chambre, Reservation } from "../types/hotel";
import { Filter, Search } from "lucide-react";

const ChambresPage: React.FC = () => {
  const [chambres] = useState<Chambre[]>(chambresData);
  const [selectedChambre, setSelectedChambre] = useState<Chambre | null>(null);
  const [showReservationForm, setShowReservationForm] = useState(false);
  const [filters, setFilters] = useState({
    type: "all",
    prixMax: 100000,
    capacite: 1,
  });
  const [searchTerm, setSearchTerm] = useState("");

  const typesDisponibles = [
    "all",
    ...Array.from(new Set(chambres.map((c) => c.type))),
  ];

  const chambresFiltrees = chambres.filter((chambre) => {
    const matchType = filters.type === "all" || chambre.type === filters.type;
    const matchPrix = chambre.prix <= filters.prixMax;
    const matchCapacite = chambre.capacite >= filters.capacite;
    const matchSearch =
      chambre.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chambre.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chambre.description.toLowerCase().includes(searchTerm.toLowerCase());

    return (
      matchType &&
      matchPrix &&
      matchCapacite &&
      matchSearch &&
      chambre.disponible
    );
  });

  const handleReservation = (chambre: Chambre) => {
    setSelectedChambre(chambre);
    setShowReservationForm(true);
  };

  const handleReservationSubmit = (
    reservationData: Omit<Reservation, "id" | "dateReservation" | "statut">
  ) => {
    console.log("Réservation soumise:", reservationData);
    // Ici, vous pourriez envoyer les données à un backend
    alert("Réservation confirmée! Vous allez être redirigé vers le paiement.");
    setShowReservationForm(false);
    setSelectedChambre(null);
  };

  const prixMax = Math.max(...chambres.map((c) => c.prix));
  const capaciteMax = Math.max(...chambres.map((c) => c.capacite));

  return (
    <div id="chambres" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Nos Chambres
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez nos chambres et suites confortables, conçues pour votre
            bien-être
          </p>
        </div>

        {/* Filtres */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <div className="flex items-center mb-4">
            <Filter className="h-5 w-5 text-gray-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">Filtres</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recherche
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Rechercher..."
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type de chambre
              </label>
              <select
                value={filters.type}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, type: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {typesDisponibles.map((type) => (
                  <option key={type} value={type}>
                    {type === "all"
                      ? "Tous les types"
                      : type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prix maximum: {filters.prixMax.toLocaleString()} FCFA
              </label>
              <input
                type="range"
                min="0"
                max={prixMax}
                step="5000"
                value={filters.prixMax}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    prixMax: parseInt(e.target.value),
                  }))
                }
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Capacité minimale: {filters.capacite} personne
                {filters.capacite > 1 ? "s" : ""}
              </label>
              <input
                type="range"
                min="1"
                max={capaciteMax}
                value={filters.capacite}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    capacite: parseInt(e.target.value),
                  }))
                }
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Résultats */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">
            {chambresFiltrees.length} chambre
            {chambresFiltrees.length > 1 ? "s" : ""} disponible
            {chambresFiltrees.length > 1 ? "s" : ""}
          </p>
          <button
            onClick={() => {
              setFilters({ type: "all", prixMax: prixMax, capacite: 1 });
              setSearchTerm("");
            }}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Réinitialiser les filtres
          </button>
        </div>

        {/* Grid des chambres */}
        {chambresFiltrees.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {chambresFiltrees.map((chambre) => (
              <ChambreCard
                key={chambre.id}
                chambre={chambre}
                onSelect={handleReservation}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Aucune chambre trouvée
            </h3>
            <p className="text-gray-600">
              Essayez d'ajuster vos filtres ou vos critères de recherche
            </p>
          </div>
        )}
      </div>

      {/* Formulaire de réservation */}
      {showReservationForm && selectedChambre && (
        <ReservationForm
          chambre={selectedChambre}
          onSubmit={handleReservationSubmit}
          onClose={() => {
            setShowReservationForm(false);
            setSelectedChambre(null);
          }}
        />
      )}
    </div>
  );
};

export default ChambresPage;
