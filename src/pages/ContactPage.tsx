import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Facebook,
  Instagram,
  MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

// Wrapper component for Lucide icons
const IconWrapper: React.FC<{
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  className?: string;
}> = ({ icon: Icon, className }) => {
  return <Icon className={className} />;
};

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    sujet: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev: Record<string, string>) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nom.trim()) newErrors.nom = "Le nom est requis";
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "L'email est invalide";
    }
    if (!formData.sujet.trim()) newErrors.sujet = "Le sujet est requis";
    if (!formData.message.trim()) newErrors.message = "Le message est requis";

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      console.log("Formulaire de contact soumis:", formData);
      setSubmitted(true);
      // Ici, vous pourriez envoyer les données à un backend
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ nom: "", email: "", sujet: "", message: "" });
      }, 3000);
    } else {
      setErrors(validationErrors);
    }
  };

  const coordonnees = [
    {
      icon: MapPin,
      title: "Adresse",
      content: "Route des Pêcheries, Cotonou, Bénin",
      detail: "En face du marché Dantokpa",
    },
    {
      icon: Phone,
      title: "Téléphone",
      content: "+229 01 40 58 58 35",
      detail: "Disponible 24/7",
    },
    {
      icon: Mail,
      title: "Email",
      content: "nolcopcoding@gmail.com",
      detail: "Réponse sous 24h",
    },
    {
      icon: Clock,
      title: "Horaires",
      content: "Réception: 24/7",
      detail: "Restaurant: 6h - 23h",
    },
  ];

  const reseauxSociaux = [
    { label: "Accueil", href: "/" },
    { icon: Facebook, name: "Facebook", url: "#" },
    { icon: Instagram, name: "Instagram", url: "#" },
    {
      icon: MessageCircle,
      name: "WhatsApp",
      url: "https://wa.me/2290140585835",
    },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <div id="contact" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Contactez-nous
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nous sommes à votre disposition pour répondre à toutes vos questions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Informations de contact */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Nos Coordonnées
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {coordonnees.map((info, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <info.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {info.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{info.content}</p>
                    <p className="text-gray-500 text-xs">{info.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Carte */}
            <div className="bg-white p-4 rounded-lg shadow-lg mb-8">
              <h3 className="font-semibold text-gray-800 mb-3">
                Notre Localisation
              </h3>
              <div className="relative h-64 bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src="https://picsum.photos/seed/mapcotounou/600/400.jpg"
                  alt="Carte de Cotonou"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg">
                    <MapPin className="h-5 w-5 inline mr-2" />
                    Hôtel Horizon Cotonou
                  </div>
                </div>
              </div>
            </div>

            {/* Réseaux sociaux */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Suivez-nous</h3>
              <div className="flex space-x-4">
                {reseauxSociaux.map((reseau, index) => {
                  if (reseau.href) {
                    return (
                      <Link
                        key={index}
                        to={reseau.href}
                        className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
                        aria-label={reseau.label}
                      >
                        <span>{reseau.label}</span>
                      </Link>
                    );
                  }
                  return (
                    <a
                      key={index}
                      href={reseau.url || "#"}
                      className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
                      aria-label={reseau.name}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="flex items-center">
                        {reseau.icon && (
                          <IconWrapper icon={reseau.icon} className="h-5 w-5" />
                        )}
                        <span>{reseau.name || reseau.label}</span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Formulaire de contact */}
          <div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Envoyez-nous un message
              </h2>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Message envoyé!
                  </h3>
                  <p className="text-gray-600">
                    Merci pour votre message. Nous vous répondrons dans les plus
                    brefs délais.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      value={formData.nom}
                      onChange={(e) => handleChange("nom", e.target.value)}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.nom ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Votre nom complet"
                    />
                    {errors.nom && (
                      <p className="text-red-500 text-sm mt-1">{errors.nom}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="votre@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sujet
                    </label>
                    <input
                      type="text"
                      value={formData.sujet}
                      onChange={(e) => handleChange("sujet", e.target.value)}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.sujet ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Sujet de votre message"
                    />
                    {errors.sujet && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.sujet}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      rows={6}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.message ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Votre message..."
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Envoyer le message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
