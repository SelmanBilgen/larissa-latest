//import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/bereket-larissa-logo.png";
import { useLanguage } from "../context/LanguageContext";
import {
  Instagram,
  Facebook,
  Twitter,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-dark-text-new text-white pt-12 pb-6">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Logo and Social Links */}
          <div>
            <Link to="/" className="flex items-center mb-4">
              {/* <Coffee className="h-8 w-8 text-turkish-red mr-2" />
              <span className="font-playfair text-2xl font-bold">
                <span className="text-turkish-red">Bereket</span>
                <span className="text-greek-blue">Larissa</span>
              </span> */}
              <img
                src={logo}
                alt={t.home.hero.title}
                className="w-24  rounded-full"
              />
            </Link>
            {/* <p className="text-gray-300 mb-4">
              Authentic Turkish cuisine with a Mediterranean twist, bringing the
              flavors of Turkey to the shores of Greece.
            </p> */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-700 hover:text-accent-gold transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-accent-gold transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-accent-gold transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-playfair font-bold mb-4 text-accent-gold">
              {t.footer.about}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-700 hover:text-accent-gold transition-colors duration-300"
                >
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link
                  to="/menu"
                  className="text-gray-700 hover:text-accent-gold transition-colors duration-300"
                >
                  {t.nav.menu}
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-700 hover:text-accent-gold transition-colors duration-300"
                >
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-700 hover:text-accent-gold transition-colors duration-300"
                >
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-xl font-playfair font-bold mb-4 text-accent-gold">
              {t.footer.hours}
            </h3>
            <ul className="space-y-2">
              <li className="text-gray-700">{t.contact.hours.weekdays}</li>
              <li className="text-gray-700">{t.contact.hours.weekends}</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-playfair font-bold mb-4 text-accent-gold">
              {t.contact.info.title}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <a href="https://maps.app.goo.gl/TLdhjd34X5VTM1xj8">
                  <MapPin className="h-5 w-5 text-turkish-red mr-2 mt-0.5" />
                </a>
                <span className="text-gray-700">{t.contact.info.address.value}</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-turkish-red mr-2" />
                <span className="text-gray-700">{t.contact.info.phone.value}</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-turkish-red mr-2" />
                <span className="text-gray-700">{t.contact.info.email.value}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-700">
          <p>{t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
