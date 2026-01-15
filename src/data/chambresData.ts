import { Chambre } from "../types/hotel";

export const chambresData: Chambre[] = [
  {
    id: "1",
    numero: "101",
    type: "simple",
    prix: 25000,
    capacite: 1,
    description:
      "Chambre simple confortable avec lit double, climatisation et Wi-Fi",
    image:
      "https://images.unsplash.com/photo-1611892440507-42a792e24d32?w=800&h=600&fit=crop&auto=format",
    equipements: [
      "Climatisation",
      "Wi-Fi",
      "TV",
      "Salle de bain privée",
      "Minibar",
    ],
    disponible: true,
  },
  {
    id: "2",
    numero: "102",
    type: "double",
    prix: 35000,
    capacite: 2,
    description:
      "Chambre double spacieuse avec lit king-size, vue sur la piscine",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop&auto=format",
    equipements: [
      "Climatisation",
      "Wi-Fi",
      "TV",
      "Salle de bain privée",
      "Minibar",
      "Balcon",
    ],
    disponible: true,
  },
  {
    id: "3",
    numero: "201",
    type: "suite",
    prix: 55000,
    capacite: 3,
    description: "Suite luxueuse avec salon séparé, vue sur l'océan",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop&auto=format",
    equipements: [
      "Climatisation",
      "Wi-Fi",
      "TV",
      "Salle de bain privée",
      "Minibar",
      "Balcon",
      "Salon",
      "Cafetière",
    ],
    disponible: true,
  },
  {
    id: "4",
    numero: "301",
    type: "deluxe",
    prix: 75000,
    capacite: 4,
    description: "Suite deluxe avec jacuzzi privé, terrasse panoramique",
    image:
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f5?w=800&h=600&fit=crop&auto=format",
    equipements: [
      "Climatisation",
      "Wi-Fi",
      "TV",
      "Salle de bain privée",
      "Minibar",
      "Balcon",
      "Salon",
      "Cafetière",
      "Jacuzzi",
      "Terrasse",
    ],
    disponible: true,
  },
  {
    id: "5",
    numero: "103",
    type: "simple",
    prix: 25000,
    capacite: 1,
    description: "Chambre simple au rez-de-chaussée, accès facile",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop&auto=format",
    equipements: [
      "Climatisation",
      "Wi-Fi",
      "TV",
      "Salle de bain privée",
      "Minibar",
    ],
    disponible: true,
  },
  {
    id: "6",
    numero: "202",
    type: "double",
    prix: 35000,
    capacite: 2,
    description: "Chambre double avec deux lits simples, idéale pour familles",
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a4219?w=800&h=600&fit=crop&auto=format",
    equipements: [
      "Climatisation",
      "Wi-Fi",
      "TV",
      "Salle de bain privée",
      "Minibar",
      "Balcon",
    ],
    disponible: true,
  },
];
