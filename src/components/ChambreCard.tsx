import React from "react";
import { Chambre } from "../types/hotel";
import { Bed, Users, Wifi, Coffee } from "lucide-react";

interface ChambreCardProps {
  chambre: Chambre;
  onSelect: (chambre: Chambre) => void;
}

const ChambreCard: React.FC<ChambreCardProps> = ({ chambre, onSelect }) => {
  const getIconeEquipement = (equipement: string) => {
    switch (equipement.toLowerCase()) {
      case "wi-fi":
      case "wifi":
        return <Wifi className="h-4 w-4" />;
      case "climatisation":
        return <Coffee className="h-4 w-4" />;
      case "minibar":
        return <Coffee className="h-4 w-4" />;
      default:
        return <Bed className="h-4 w-4" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
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
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              Chambre {chambre.numero}
            </h3>
            <p className="text-gray-600 text-sm mt-1">{chambre.description}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-600">
              {chambre.prix.toLocaleString()} FCFA
            </p>
            <p className="text-sm text-gray-500">par nuit</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 mb-4 text-gray-600">
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span className="text-sm">
              {chambre.capacite} personne{chambre.capacite > 1 ? "s" : ""}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Bed className="h-4 w-4" />
            <span className="text-sm capitalize">{chambre.type}</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {chambre.equipements.slice(0, 3).map((equipement, index) => (
              <div
                key={index}
                className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded text-xs text-gray-600"
              >
                {getIconeEquipement(equipement)}
                <span>{equipement}</span>
              </div>
            ))}
            {chambre.equipements.length > 3 && (
              <span className="text-xs text-gray-500">
                +{chambre.equipements.length - 3} autres
              </span>
            )}
          </div>
        </div>

        <button
          onClick={() => onSelect(chambre)}
          disabled={!chambre.disponible}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
            chambre.disponible
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {chambre.disponible ? "Réserver maintenant" : "Indisponible"}
        </button>
      </div>
    </div>
  );
};

export default ChambreCard;
