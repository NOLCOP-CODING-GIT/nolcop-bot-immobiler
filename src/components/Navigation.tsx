import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Calendar, Home, Bed, Phone, Menu, X } from "lucide-react";

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: "Accueil", href: "/accueil" },
    { icon: Bed, label: "Chambres", href: "/chambres" },
    { icon: Calendar, label: "Réservation", href: "/reservation" },
    { icon: Phone, label: "Contact", href: "/contact" },
  ];

  const isActive = (path: string) => {
    return (
      location.pathname === path ||
      (path === "/accueil" && location.pathname === "/")
    );
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-white/20 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                  isActive(item.href)
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-700 hover:bg-white/50 hover:text-blue-600 hover:shadow-md"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          <button
            className="md:hidden p-2 rounded-lg bg-white/50 hover:bg-white/70 transition-all duration-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 space-y-2 backdrop-blur-lg bg-white/90 rounded-2xl mt-2 shadow-xl border border-white/20">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-300 mx-2 ${
                  isActive(item.href)
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-white/70 hover:text-blue-600"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
