import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import logo from "../assets/bereket-larissa-logo.png";
import { useLanguage } from "../context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

type NavLink = {
  path: string;
  key: keyof typeof import("../translations/en").en.nav;
};

const navLinks: NavLink[] = [
  { path: "/", key: "home" },
  { path: "/menu", key: "menu" },
  { path: "/about", key: "about" },
  { path: "/contact", key: "contact" },
  { path: "/admin", key: "admin" },
];

// Pages with light backgrounds that need dark text
const LIGHT_BACKGROUND_ROUTES = ["/menu", "/contact", "/admin"];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const isLightBackground = LIGHT_BACKGROUND_ROUTES.includes(location.pathname);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled || isLightBackground ? "bg-white/95 backdrop-blur-sm shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            to="/"
            onClick={scrollToTop}
            className="flex items-center space-x-2"
          >
            <img
              src={logo}
              alt="Bereket Larissa Logo"
              className="h-16 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                to={link.path}
                onClick={scrollToTop}
                className={`text-lg font-medium transition-colors duration-300 hover:text-accent-gold ${
                  location.pathname === link.path
                    ? "text-accent-gold"
                    : scrolled || isLightBackground
                    ? "text-dark-text"
                    : "text-white"
                }`}
              >
                {t.nav[link.key]}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button and Language Switcher */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden ${scrolled || isLightBackground ? "text-dark-text" : "text-white"}`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, height: "auto" },
          closed: { opacity: 0, height: 0 },
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-white"
      >
        <div className="px-4 py-2">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              to={link.path}
              onClick={() => {
                setIsOpen(false);
                scrollToTop();
              }}
              className={`${
                location.pathname === link.path
                  ? "text-accent-gold"
                  : "text-dark-text"
              } py-2 px-4 block transition-colors duration-300 hover:bg-gray-50 hover:text-accent-gold rounded-md`}
            >
              {t.nav[link.key]}
            </Link>
          ))}
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
