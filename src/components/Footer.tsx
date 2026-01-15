import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  MessageCircle,
} from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const liensUtiles = [
    { label: "Accueil", href: "#accueil" },
    { label: "Chambres", href: "#chambres" },
    { label: "Réservation", href: "#reservation" },
    { label: "Contact", href: "#contact" },
  ];

  const services = [
    { label: "Wi-Fi Gratuit", href: "#" },
    { label: "Parking", href: "#" },
    { label: "Petit-déjeuner", href: "#" },
    { label: "Salle de sport", href: "#" },
    { label: "Piscine", href: "#" },
    { label: "Service 24/7", href: "#" },
  ];

  const reseauxSociaux = [
    { icon: Facebook, label: "Facebook", href: "#" },
    { icon: Instagram, label: "Instagram", href: "#" },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      href: "https://wa.me/2290140585835",
    },
  ];

  return (
    <footer className="backdrop-blur-lg bg-gray-900/95 border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* À propos */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-linear-to-r from-blue-600 to-blue-700 p-2 rounded-xl shadow-lg">
                <img
                  src="/logo.png"
                  alt="Hôtel Horizon"
                  className="h-6 w-6 text-white"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Hôtel Horizon</h3>
                <p className="text-sm text-blue-200">Cotonou, Bénin</p>
              </div>
            </div>
            <p className="text-blue-100 mb-4 leading-relaxed">
              Découvrez le luxe et le confort au cœur de Cotonou. Un séjour
              inoubliable vous attend dans notre établissement 4 étoiles.
            </p>
            <div className="flex space-x-3">
              {reseauxSociaux.map((reseau, index) => (
                <a
                  key={index}
                  href={reseau.href}
                  className="bg-linear-to-r from-blue-600 to-blue-700 text-white p-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 backdrop-blur-md border border-white/20 shadow-lg"
                  aria-label={reseau.label}
                >
                  <reseau.icon className="h-5 w-5 text-white drop-shadow-lg" />
                </a>
              ))}
            </div>
          </div>

          {/* Liens utiles */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">
              Liens Utiles
            </h4>
            <ul className="space-y-2">
              {liensUtiles.map((lien, index) => (
                <li key={index}>
                  <a
                    href={lien.href}
                    className="text-blue-100 hover:text-blue-300 transition-all duration-300 hover:translate-x-1 inline-block font-medium"
                  >
                    {lien.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">
              Nos Services
            </h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href={service.href}
                    className="text-blue-100 hover:text-blue-300 transition-all duration-300 hover:translate-x-1 inline-block font-medium"
                  >
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-200">
              Contact
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 bg-linear-to-r from-gray-700/30 to-gray-600/30 p-4 rounded-xl backdrop-blur-md border border-white/20">
                <MapPin className="h-6 w-6 text-blue-400 drop-shadow-lg" />
                <span className="text-blue-100 font-medium">
                  Route des Pêcheries, Cotonou
                </span>
              </div>
              <div className="flex items-center space-x-3 bg-linear-to-r from-gray-700/30 to-gray-600/30 p-4 rounded-xl backdrop-blur-md border border-white/20">
                <Phone className="h-6 w-6 text-blue-400 drop-shadow-lg" />
                <span className="text-blue-100 font-medium">
                  +229 01 40 58 58 35
                </span>
              </div>
              <div className="flex items-center space-x-3 bg-linear-to-r from-gray-700/30 to-gray-600/30 p-4 rounded-xl backdrop-blur-md border border-white/20">
                <Mail className="h-6 w-6 text-blue-400 drop-shadow-lg" />
                <span className="text-blue-100 font-medium">
                  nolcopcoding@gmail.com
                </span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-800/50 rounded-lg backdrop-blur-sm border border-white/10">
              <h5 className="font-semibold mb-2 text-white">
                Horaires d'ouverture
              </h5>
              <div className="text-sm text-blue-100 space-y-1">
                <p>Réception: 24/7</p>
                <p>Restaurant: 6h - 23h</p>
                <p>Service chambres: 6h - 23h</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-200 text-sm mb-4 md:mb-0">
              © {currentYear} Hôtel Horizon Cotonou. Tous droits réservés.
            </p>
            <div className="flex space-x-6 text-sm">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:translate-y-[-2px] inline-block"
              >
                Politique de confidentialité
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:translate-y-[-2px] inline-block"
              >
                Conditions générales
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:translate-y-[-2px] inline-block"
              >
                Mentions légales
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
