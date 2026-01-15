export interface Chambre {
  id: string;
  numero: string;
  type: "simple" | "double" | "suite" | "deluxe";
  prix: number;
  capacite: number;
  description: string;
  image: string;
  equipements: string[];
  disponible: boolean;
}

export interface Reservation {
  id: string;
  chambreId: string;
  nomClient: string;
  email: string;
  telephone: string;
  dateArrivee: Date;
  dateDepart: Date;
  nombrePersonnes: number;
  montantTotal: number;
  statut: "en_attente" | "confirmee" | "annulee";
  dateReservation: Date;
  paiement?: Paiement;
}

export interface Paiement {
  id: string;
  reservationId: string;
  montant: number;
  methode: "carte" | "mobile_money" | "virement";
  statut: "en_attente" | "effectue" | "echoue";
  datePaiement: Date;
  transactionId?: string;
}

export interface Disponibilite {
  chambreId: string;
  date: Date;
  disponible: boolean;
  reservationId?: string;
}
