import React, { useState } from "react";
import { chambresData } from "../data/chambresData";
import ReservationForm from "../components/ReservationForm";
import PaiementForm from "../components/PaiementForm";
import { Chambre, Reservation, Paiement } from "../types/hotel";
import { Calendar, Clock, Users, Search, CheckCircle } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { differenceInDays, format } from "date-fns";
import { fr } from "date-fns/locale";

const ReservationPage: React.FC = () => {
  const [chambres] = useState<Chambre[]>(chambresData);
  const [selectedChambre, setSelectedChambre] = useState<Chambre | null>(null);
  const [showReservationForm, setShowReservationForm] = useState(false);
  const [showPaiementForm, setShowPaiementForm] = useState(false);
  const [currentReservation, setCurrentReservation] = useState<Omit<
    Reservation,
    "id" | "dateReservation" | "statut"
  > | null>(null);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [searchDates, setSearchDates] = useState({
    dateArrivee: new Date(),
    dateDepart: tomorrow,
  });
  const [nombrePersonnes, setNombrePersonnes] = useState(1);

  const chambresDisponibles = chambres.filter((chambre) => {
    return chambre.disponible && chambre.capacite >= nombrePersonnes;
  });

  const handleReservation = (chambre: Chambre) => {
    setSelectedChambre(chambre);
    setShowReservationForm(true);
  };

  const handleReservationSubmit = (
    reservationData: Omit<Reservation, "id" | "dateReservation" | "statut">
  ) => {
    setCurrentReservation(reservationData);
    setShowReservationForm(false);
    setShowPaiementForm(true);
  };

  const handlePaiementSuccess = (
    paiementData: Omit<Paiement, "id" | "datePaiement">
  ) => {
    console.log("Réservation complétée:", {
      reservation: currentReservation,
      paiement: paiementData,
    });

    setShowPaiementForm(false);
    setCurrentReservation(null);
    setSelectedChambre(null);

    // Afficher un message de succès
    alert(
      "Félicitations! Votre réservation a été confirmée avec succès. Vous allez recevoir un email de confirmation."
    );
  };

  const handleRetourPaiement = () => {
    setShowPaiementForm(false);
    setShowReservationForm(true);
  };

  const calculateNuits = () => {
    return differenceInDays(searchDates.dateDepart, searchDates.dateArrivee);
  };

  const calculatePrixTotal = (chambre: Chambre) => {
    return chambre.prix * calculateNuits();
  };

  return (
    <div id="reservation" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Réservation en Ligne
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Réservez votre chambre en quelques clics et profitez de nos
            meilleures offres
          </p>
        </div>

        {/* Section de recherche rapide */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <Search className="h-5 w-5 mr-2" />
            Recherche Rapide
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="inline h-4 w-4 mr-1" />
                Date d'arrivée
              </label>
              <DatePicker
                selected={searchDates.dateArrivee}
                onChange={(date: Date | null) =>
                  setSearchDates((prev) => ({
                    ...prev,
                    dateArrivee: date || new Date(),
                  }))
                }
                minDate={new Date()}
                locale={fr}
                dateFormat="dd/MM/yyyy"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="inline h-4 w-4 mr-1" />
                Date de départ
              </label>
              <DatePicker
                selected={searchDates.dateDepart}
                onChange={(date: Date | null) =>
                  setSearchDates((prev) => ({
                    ...prev,
                    dateDepart: date || new Date(),
                  }))
                }
                minDate={searchDates.dateArrivee}
                locale={fr}
                dateFormat="dd/MM/yyyy"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users className="inline h-4 w-4 mr-1" />
                Nombre de personnes
              </label>
              <select
                value={nombrePersonnes}
                onChange={(e) => setNombrePersonnes(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={1}>1 personne</option>
                <option value={2}>2 personnes</option>
                <option value={3}>3 personnes</option>
                <option value={4}>4 personnes</option>
              </select>
            </div>

            <div className="flex items-end">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Durée du séjour</p>
                <p className="text-lg font-semibold text-blue-600">
                  {calculateNuits()} nuit{calculateNuits() > 1 ? "s" : ""}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Résultats de la recherche */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Chambres disponibles ({chambresDisponibles.length})
          </h2>
          <p className="text-gray-600">
            Pour{" "}
            {format(searchDates.dateArrivee, "dd MMMM yyyy", { locale: fr })} au{" "}
            {format(searchDates.dateDepart, "dd MMMM yyyy", { locale: fr })} -{" "}
            {nombrePersonnes} personne{nombrePersonnes > 1 ? "s" : ""}
          </p>
        </div>

        {/* Grid des chambres disponibles */}
        {chambresDisponibles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {chambresDisponibles.map((chambre) => (
              <div
                key={chambre.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48 bg-gray-200">
                  <img
                    src={chambre.image}
                    alt={`Chambre ${chambre.numero}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = `https://picsum.photos/seed/chambre${chambre.id}/400/300.jpg`;
                    }}
                  />
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {chambre.type}
                  </div>
                  {chambre.capacite >= nombrePersonnes && (
                    <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Disponible
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        Chambre {chambre.numero}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">
                        {chambre.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 mb-4 text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">
                        {chambre.capacite} personne
                        {chambre.capacite > 1 ? "s" : ""}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">
                        {calculateNuits()} nuit{calculateNuits() > 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">
                        Prix par nuit:
                      </span>
                      <span className="text-sm font-semibold">
                        {chambre.prix.toLocaleString()} FCFA
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-800">
                        Total:
                      </span>
                      <span className="text-xl font-bold text-blue-600">
                        {calculatePrixTotal(chambre).toLocaleString()} FCFA
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleReservation(chambre)}
                    className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Réserver maintenant
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Calendar className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Aucune chambre disponible
            </h3>
            <p className="text-gray-600">
              Désolé, aucune chambre n'est disponible pour ces dates. Essayez
              d'autres dates.
            </p>
          </div>
        )}

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

        {/* Formulaire de paiement */}
        {showPaiementForm && currentReservation && (
          <PaiementForm
            montant={currentReservation.montantTotal}
            reservationId={currentReservation.chambreId}
            onPaiementSuccess={handlePaiementSuccess}
            onRetour={handleRetourPaiement}
          />
        )}
      </div>
    </div>
  );
};

export default ReservationPage;
