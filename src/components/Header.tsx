import React from "react";
import { Hotel, Phone, Mail, MapPin } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="backdrop-blur-lg bg-white/90 border-b border-white/20 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-xl shadow-lg">
              <Hotel className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Hôtel Horizon
              </h1>
              <p className="text-sm text-gray-600">Cotonou, Bénin</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-gray-700 bg-white/50 px-3 py-2 rounded-lg hover:bg-white/70 transition-all duration-300">
              <Phone className="h-4 w-4" />
              <span className="text-sm font-medium">+229 01 40 58 58 35</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-700 bg-white/50 px-3 py-2 rounded-lg hover:bg-white/70 transition-all duration-300">
              <Mail className="h-4 w-4" />
              <span className="text-sm font-medium">
                nolcopcoding@gmail.com
              </span>
            </div>
            <div className="flex items-center space-x-2 text-gray-700 bg-white/50 px-3 py-2 rounded-lg hover:bg-white/70 transition-all duration-300">
              <MapPin className="h-4 w-4" />
              <span className="text-sm font-medium">Route des Pêcheries</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
