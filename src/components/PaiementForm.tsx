import React, { useState } from "react";
import { Paiement } from "../types/hotel";
import {
  CreditCard,
  Smartphone,
  Building2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface PaiementFormProps {
  montant: number;
  reservationId: string;
  onPaiementSuccess: (paiement: Omit<Paiement, "id" | "datePaiement">) => void;
  onRetour: () => void;
}

const PaiementForm: React.FC<PaiementFormProps> = ({
  montant,
  reservationId,
  onPaiementSuccess,
  onRetour,
}) => {
  const [methode, setMethode] = useState<"carte" | "mobile_money" | "virement">(
    "carte"
  );
  const [formData, setFormData] = useState({
    numeroCarte: "",
    nomTitulaire: "",
    expiration: "",
    cvv: "",
    operateur: "",
    numeroMobile: "",
    referenceVirement: "",
  });
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const validerFormulaire = () => {
    switch (methode) {
      case "carte":
        if (
          !formData.numeroCarte ||
          !formData.nomTitulaire ||
          !formData.expiration ||
          !formData.cvv
        ) {
          setError("Tous les champs de la carte sont requis");
          return false;
        }
        if (formData.numeroCarte.length < 16) {
          setError("Numéro de carte invalide");
          return false;
        }
        break;
      case "mobile_money":
        if (!formData.operateur || !formData.numeroMobile) {
          setError("Opérateur et numéro mobile sont requis");
          return false;
        }
        break;
      case "virement":
        if (!formData.referenceVirement) {
          setError("Référence de virement requise");
          return false;
        }
        break;
    }
    return true;
  };

  const simulerPaiement = async () => {
    setProcessing(true);
    setError("");

    // Simuler un délai de traitement
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simuler une validation (90% de succès)
    const succes = Math.random() > 0.1;

    if (succes) {
      const paiement: Omit<Paiement, "id" | "datePaiement"> = {
        reservationId,
        montant,
        methode,
        statut: "effectue",
        transactionId: `TXN${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      };
      onPaiementSuccess(paiement);
    } else {
      setError("Le paiement a échoué. Veuillez réessayer.");
      setProcessing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validerFormulaire()) {
      simulerPaiement();
    }
  };

  const renderFormulaireCarte = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Numéro de carte
        </label>
        <input
          type="text"
          value={formData.numeroCarte}
          onChange={(e) =>
            handleInputChange("numeroCarte", e.target.value.replace(/\s/g, ""))
          }
          placeholder="1234 5678 9012 3456"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          maxLength={16}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nom du titulaire
        </label>
        <input
          type="text"
          value={formData.nomTitulaire}
          onChange={(e) => handleInputChange("nomTitulaire", e.target.value)}
          placeholder="NOM COMPLET"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date d'expiration
          </label>
          <input
            type="text"
            value={formData.expiration}
            onChange={(e) => handleInputChange("expiration", e.target.value)}
            placeholder="MM/AA"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            maxLength={5}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CVV
          </label>
          <input
            type="text"
            value={formData.cvv}
            onChange={(e) => handleInputChange("cvv", e.target.value)}
            placeholder="123"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            maxLength={4}
          />
        </div>
      </div>
    </div>
  );

  const renderFormulaireMobileMoney = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Opérateur
        </label>
        <select
          value={formData.operateur}
          onChange={(e) => handleInputChange("operateur", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Sélectionner un opérateur</option>
          <option value="mtn">MTN Mobile Money</option>
          <option value="moov">Moov Money</option>
          <option value="orange">Orange Money</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Numéro mobile
        </label>
        <input
          type="tel"
          value={formData.numeroMobile}
          onChange={(e) => handleInputChange("numeroMobile", e.target.value)}
          placeholder="+229 XX XX XX XX"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );

  const renderFormulaireVirement = () => (
    <div className="space-y-4">
      <div className="p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-2">
          Coordonnées bancaires
        </h4>
        <div className="text-sm text-gray-600 space-y-1">
          <p>
            <strong>Banque:</strong> Ecobank Bénin
          </p>
          <p>
            <strong>Titulaire:</strong> Hôtel Horizon Cotonou
          </p>
          <p>
            <strong>IBAN:</strong> BJ07 00010 0012345678901234
          </p>
          <p>
            <strong>SWIFT:</strong> ECOBJBJA
          </p>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Référence de virement
        </label>
        <input
          type="text"
          value={formData.referenceVirement}
          onChange={(e) =>
            handleInputChange("referenceVirement", e.target.value)
          }
          placeholder="Référence du virement"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Paiement Sécurisé
          </h2>

          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Montant à payer:</span>
              <span className="text-2xl font-bold text-blue-600">
                {montant.toLocaleString()} FCFA
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Méthode de paiement
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setMethode("carte")}
                  className={`p-3 border rounded-lg flex flex-col items-center space-y-2 transition-colors ${
                    methode === "carte"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <CreditCard className="h-6 w-6" />
                  <span className="text-xs">Carte</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMethode("mobile_money")}
                  className={`p-3 border rounded-lg flex flex-col items-center space-y-2 transition-colors ${
                    methode === "mobile_money"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <Smartphone className="h-6 w-6" />
                  <span className="text-xs">Mobile</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMethode("virement")}
                  className={`p-3 border rounded-lg flex flex-col items-center space-y-2 transition-colors ${
                    methode === "virement"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <Building2 className="h-6 w-6" />
                  <span className="text-xs">Virement</span>
                </button>
              </div>
            </div>

            {methode === "carte" && renderFormulaireCarte()}
            {methode === "mobile_money" && renderFormulaireMobileMoney()}
            {methode === "virement" && renderFormulaireVirement()}

            {error && (
              <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <span className="text-red-700 text-sm">{error}</span>
              </div>
            )}

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={onRetour}
                disabled={processing}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Retour
              </button>
              <button
                type="submit"
                disabled={processing}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center"
              >
                {processing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Traitement...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Payer {montant.toLocaleString()} FCFA
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaiementForm;
