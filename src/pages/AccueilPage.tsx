import React from "react";
import {
  Star,
  Wifi,
  Car,
  Coffee,
  Dumbbell,
  Waves,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const AccueilPage: React.FC = () => {
  const services = [
    {
      icon: Wifi,
      title: "Wi-Fi Gratuit",
      description: "Internet haut débit dans tout l'hôtel",
      link: { label: "Accueil", href: "/" },
    },
    {
      icon: Car,
      title: "Parking Sécurisé",
      description: "Parking privé surveillé 24/7",
    },
    {
      icon: Coffee,
      title: "Petit-déjeuner",
      description: "Buffet continental inclus",
    },
    {
      icon: Dumbbell,
      title: "Salle de Sport",
      description: "Équipement moderne disponible",
    },
    {
      icon: Waves,
      title: "Piscine",
      description: "Piscine extérieure avec vue",
      link: { label: "Réservation", href: "/reservation" },
    },
    {
      icon: CheckCircle,
      title: "Service 24/7",
      description: "Réception disponible en continu",
    },
  ];

  const temoignages = [
    {
      nom: "Marie K.",
      note: 5,
      commentaire:
        "Excellent séjour, personnel très professionnel et chambres très confortables.",
      pays: "France",
    },
    {
      nom: "Jean-Paul A.",
      note: 5,
      commentaire:
        "Hôtel magnifique, service impeccable. Je reviendrai sans hésiter!",
      pays: "Bénin",
    },
    {
      nom: "Sophie L.",
      note: 4,
      commentaire:
        "Très bel hôtel, bien situé. Le petit-déjeuner est excellent.",
      pays: "Canada",
      link: { label: "Contact", href: "/contact" },
    },
  ];

  const renderStars = (note: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < note ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <div>
      {/* Hero Section */}
      <section
        id="accueil"
        className="relative h-96 bg-linear-to-r from-blue-600 to-blue-800"
      >
        <div className="absolute inset-0 bg-black bg-opacity-40">
          <img
            src="https://picsum.photos/seed/hotelhorizon/1920/600.jpg"
            alt="Hôtel Horizon Cotonou"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl font-bold mb-4">
              Bienvenue à l'Hôtel Horizon
            </h1>
            <p className="text-xl mb-6">
              Découvrez le luxe et le confort au cœur de Cotonou. Un séjour
              inoubliable vous attend dans notre établissement 4 étoiles.
            </p>
            <Link
              to="/chambres"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Réserver maintenant
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Nos Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Profitez de nos installations modernes et de notre service
              exceptionnel
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <service.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* À Propos Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                À Propos de l'Hôtel Horizon
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Situé en plein cœur de Cotonou, l'Hôtel Horizon vous offre une
                  expérience luxueuse et mémorable. Notre établissement 4
                  étoiles combine élégance moderne et chaleur africaine.
                </p>
                <p>
                  Avec nos 50 chambres et suites spacieuses, notre restaurant
                  gastronomique, et notre équipe dévouée, nous nous engageons à
                  rendre votre séjour inoubliable.
                </p>
                <p>
                  Que vous soyez ici pour affaires ou pour le plaisir, l'Hôtel
                  Horizon est le choix parfait pour découvrir la beauté et la
                  culture du Bénin.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">50+</div>
                  <div className="text-gray-600">Chambres</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">15+</div>
                  <div className="text-gray-600">Années d'expérience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">10K+</div>
                  <div className="text-gray-600">Clients satisfaits</div>
                </div>
              </div>
            </div>

            <div className="relative h-96 rounded-lg overflow-hidden">
              <img
                src="https://picsum.photos/seed/hotellobby/600/400.jpg"
                alt="Lobby de l'hôtel"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Témoignages Clients
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez ce que nos clients disent de leur séjour chez nous
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {temoignages.map((temoignage, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex mb-4">{renderStars(temoignage.note)}</div>
                <p className="text-gray-600 mb-4 italic">
                  "{temoignage.commentaire}"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-800">
                      {temoignage.nom}
                    </div>
                    <div className="text-sm text-gray-500">
                      {temoignage.pays}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AccueilPage;
