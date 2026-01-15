import React, { useState } from "react";
import { Chambre, Reservation } from "../types/hotel";
import { Calendar, Users, CreditCard, Phone, Mail, User } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { differenceInDays } from "date-fns";
import { fr } from "date-fns/locale";

interface ReservationFormProps {
  chambre: Chambre;
  onSubmit: (
    reservation: Omit<Reservation, "id" | "dateReservation" | "statut">
  ) => void;
  onClose: () => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({
  chambre,
  onSubmit,
  onClose,
}) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [formData, setFormData] = useState({
    nomClient: "",
    email: "",
    telephone: "",
    dateArrivee: new Date(),
    dateDepart: tomorrow,
    nombrePersonnes: 1,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const calculateMontantTotal = () => {
    const nuits = differenceInDays(formData.dateDepart, formData.dateArrivee);
    return nuits * chambre.prix;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nomClient.trim()) newErrors.nomClient = "Le nom est requis";
    if (!formData.email.trim()) newErrors.email = "L'email est requis";
    if (!formData.telephone.trim())
      newErrors.telephone = "Le téléphone est requis";
    if (formData.dateArrivee >= formData.dateDepart) {
      newErrors.dateDepart =
        "La date de départ doit être après la date d'arrivée";
    }
    if (formData.nombrePersonnes > chambre.capacite) {
      newErrors.nombrePersonnes = `La capacité maximale est de ${chambre.capacite} personne${chambre.capacite > 1 ? "s" : ""}`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        chambreId: chambre.id,
        ...formData,
        montantTotal: calculateMontantTotal(),
      });
    }
  };

  const handleChange = (
    field: string,
    value: string | number | Date | null
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Réservation - Chambre {chambre.numero}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>

          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-800">
                  {chambre.type} - Chambre {chambre.numero}
                </p>
                <p className="text-sm text-gray-600">{chambre.description}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-blue-600">
                  {chambre.prix.toLocaleString()} FCFA
                </p>
                <p className="text-sm text-gray-500">par nuit</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="inline h-4 w-4 mr-1" />
                  Nom complet
                </label>
                <input
                  type="text"
                  value={formData.nomClient}
                  onChange={(e) => handleChange("nomClient", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.nomClient ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Votre nom complet"
                />
                {errors.nomClient && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.nomClient}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="inline h-4 w-4 mr-1" />
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="votre@email.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="inline h-4 w-4 mr-1" />
                  Téléphone
                </label>
                <input
                  type="tel"
                  value={formData.telephone}
                  onChange={(e) => handleChange("telephone", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.telephone ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="+229 XX XX XX XX"
                />
                {errors.telephone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.telephone}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="inline h-4 w-4 mr-1" />
                  Nombre de personnes
                </label>
                <select
                  value={formData.nombrePersonnes}
                  onChange={(e) =>
                    handleChange("nombrePersonnes", parseInt(e.target.value))
                  }
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.nombrePersonnes
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                >
                  {Array.from(
                    { length: chambre.capacite },
                    (_, i) => i + 1
                  ).map((num) => (
                    <option key={num} value={num}>
                      {num} personne{num > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
                {errors.nombrePersonnes && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.nombrePersonnes}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  Date d'arrivée
                </label>
                <DatePicker
                  selected={formData.dateArrivee}
                  onChange={(date: Date | null) =>
                    handleChange("dateArrivee", date)
                  }
                  minDate={new Date()}
                  locale={fr}
                  dateFormat="dd/MM/yyyy"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.dateArrivee ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  Date de départ
                </label>
                <DatePicker
                  selected={formData.dateDepart}
                  onChange={(date: Date | null) =>
                    handleChange("dateDepart", date)
                  }
                  minDate={formData.dateArrivee}
                  locale={fr}
                  dateFormat="dd/MM/yyyy"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.dateDepart ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.dateDepart && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.dateDepart}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Nombre de nuits:</span>
                <span className="font-semibold">
                  {differenceInDays(formData.dateDepart, formData.dateArrivee)}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Prix par nuit:</span>
                <span className="font-semibold">
                  {chambre.prix.toLocaleString()} FCFA
                </span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-800">
                    Total:
                  </span>
                  <span className="text-xl font-bold text-blue-600">
                    {calculateMontantTotal().toLocaleString()} FCFA
                  </span>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Confirmer la réservation
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReservationForm;
