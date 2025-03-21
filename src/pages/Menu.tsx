import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
// Import all menu images
import turkishSalsaImg from "../assets/menu/ezme.jpg";
import tzatzikiImg from "../assets/menu/cacik.jpg";
import smokedEggplantImg from "../assets/menu/patlican-salatasi.jpg";
import hummusImg from "../assets/menu/humus.jpeg";
import veganMeatballsImg from "../assets/menu/cig-kofte.jpg";
import lahmacunImg from "../assets/menu/Lahmacun.jpg";
import halloumiImg from "../assets/menu/hellim-kizartma.jpg";
import crispyCheeseImg from "../assets/menu/sigara.jpg";
import frenchFriesImg from "../assets/menu/patates-kizartmasi.jpg";
import patsaSoupImg from "../assets/menu/kelle2.png";
import lentilSoupImg from "../assets/menu/mercimek-corbasi.jpg";
import bakedFetaImg from "../assets/menu/hellim-kizartma.jpg";
import falafelImg from "../assets/menu/falafel.jpg";
import croquettesImg from "../assets/menu/icli-kofte.jpg";
import shepherdImg from "../assets/menu/coban-salatasi.jpg";
import prasiniImg from "../assets/menu/prasini-salata.jpg";
import greekImg from "../assets/menu/yunan-salatasi.jpg";
import adanaImg from "../assets/menu/adana-kebap.jpeg";
import urfaImg from "../assets/menu/adana-kebap.jpeg";
import yogurtImg from "../assets/menu/Kebap-yogurlu.jpg";
import iskenderImg from "../assets/menu/iskender.jpeg";
import donerImg from "../assets/menu/et-doner.jpeg";
import beytiImg from "../assets/menu/beyti.jpg";
import lambSkewersImg from "../assets/menu/sis-kebap-et.jpeg";
import chickenSkewersImg from "../assets/menu/tavuk-sis.jpeg";
import mixedGrillImg from "../assets/menu/karisik-kebap.jpeg";
import chickenWingsImg from "../assets/menu/tavuk-kanat-sis.jpeg";
import meatballsImg from "../assets/menu/kofte.png";
import cheeseSucukImg from "../assets/menu/kiymali-sucuklu-pide.jpg";
import cheeseMincePideImg from "../assets/menu/Kasarli-kiymali-pide.jpg";
import cheeseMeatImg from "../assets/menu/kasarli-kusbasili-pide.jpg";
import donerPitaImg from "../assets/menu/Doner-sandwich.jpg";
import chickenDonerImg from "../assets/menu/tavuk-sandwich.jpg";
import kebabImg from "../assets/menu/adana-sandwich.jpg";
import falafelSandwichImg from "../assets/menu/falafel-sandwich.jpg";
import bereketImg from "../assets/menu/Kebap-yogurlu.jpg";
import donerWrapImg from "../assets/menu/doner-durum.jpg";
import colaImg from "../assets/menu/cola.jpg";
import colaLightImg from "../assets/menu/cola-light.jpeg";
import colaZeroImg from "../assets/menu/cola-zero.jpeg";
import spriteImg from "../assets/menu/sprite.jpg";
import fantaOrangeImg from "../assets/menu/fanta-orange.jpg";
import fantaBlueImg from "../assets/menu/fanta-blue.jpg";
import sparklingWaterImg from "../assets/menu/beypazari.jpg";
import salgamImg from "../assets/menu/salgam.png";
import water500Img from "../assets/menu/su500.jpg";
import water1LImg from "../assets/menu/su1lt.png";
import ayranImg from "../assets/menu/ayran.png";
import peachJuiceImg from "../assets/menu/seftali.jpg";
import sourCherryJuiceImg from "../assets/menu/visne.jpg";
import defaultMenuImg from "../assets/menu/falafel-sandwich.jpg";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  tags: string[];
}

interface MenuCategory {
  title: string;
  items: {
    [key: string]: {
      name: string;
      description: string;
      price: string;
    };
  };
}

interface MenuCategories {
  "appetizers-cold": MenuCategory;
  "appetizers-hot": MenuCategory;
  salads: MenuCategory;
  kebabs: MenuCategory;
  pides: MenuCategory;
  "sandwiches-wraps": MenuCategory;
  refreshments: MenuCategory;
}

const Menu = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");

  // Define categories based on translation structure
  const categories = [
    { id: "all", name: "All" },
    { id: "appetizers-cold", name: t.menu.categories["appetizers-cold"].title },
    { id: "appetizers-hot", name: t.menu.categories["appetizers-hot"].title },
    { id: "salads", name: t.menu.categories.salads.title },
    { id: "kebabs", name: t.menu.categories.kebabs.title },
    { id: "pides", name: t.menu.categories.pides.title },
    { id: "sandwiches-wraps", name: t.menu.categories["sandwiches-wraps"].title },
    { id: "refreshments", name: t.menu.categories.refreshments.title },
  ];

  // Helper function to get item images
  const getMenuItemImage = (key: string) => {
    const images: { [key: string]: string } = {
      turkishSalsa: turkishSalsaImg,
      tzatziki: tzatzikiImg,
      smokedEggplant: smokedEggplantImg,
      hummus: hummusImg,
      veganMeatballs: veganMeatballsImg,
      lahmacun: lahmacunImg,
      halloumi: halloumiImg,
      crispyCheese: crispyCheeseImg,
      frenchFries: frenchFriesImg,
      patsaSoup: patsaSoupImg,
      lentilSoup: lentilSoupImg,
      bakedFeta: bakedFetaImg,
      falafel: falafelImg,
      croquettes: croquettesImg,
      shepherd: shepherdImg,
      prasini: prasiniImg,
      greek: greekImg,
      adana: adanaImg,
      urfa: urfaImg,
      yogurt: yogurtImg,
      iskender: iskenderImg,
      doner: donerImg,
      beyti: beytiImg,
      lambSkewers: lambSkewersImg,
      chickenSkewers: chickenSkewersImg,
      mixedGrill: mixedGrillImg,
      chickenWings: chickenWingsImg,
      meatballs: meatballsImg,
      cheeseSucuk: cheeseSucukImg,
      cheeseMince: cheeseMincePideImg,
      cheeseMeat: cheeseMeatImg,
      donerPita: donerPitaImg,
      chickenDoner: chickenDonerImg,
      kebab: kebabImg,
      falafelSandwich: falafelSandwichImg,
      bereket: bereketImg,
      donerWrap: donerWrapImg,
      cola: colaImg,
      colaLight: colaLightImg,
      colaZero: colaZeroImg,
      sprite: spriteImg,
      fantaOrange: fantaOrangeImg,
      fantaBlue: fantaBlueImg,
      sparklingWater: sparklingWaterImg,
      salgam: salgamImg,
      water500: water500Img,
      water1L: water1LImg,
      ayran: ayranImg,
      peachJuice: peachJuiceImg,
      sourCherryJuice: sourCherryJuiceImg
    };
    return images[key] || defaultMenuImg;
  };

  // Helper function to get item tags
  const getItemTags = (key: string) => {
    const tags: { [key: string]: string[] } = {
      // Cold Appetizers
      turkishSalsa: ["Vegetarian", "Gluten-Free"],
      tzatziki: ["Vegetarian", "Gluten-Free"],
      smokedEggplant: ["Vegetarian", "Gluten-Free"],
      hummus: ["Vegetarian", "Gluten-Free"],
      veganMeatballs: ["Vegetarian", "Gluten-Free"],
      // Hot Appetizers
      lahmacun: ["Spicy"],
      halloumi: ["Vegetarian"],
      crispyCheese: ["Vegetarian"],
      frenchFries: ["Vegetarian"],
      patsaSoup: ["Traditional"],
      lentilSoup: ["Vegetarian", "Traditional"],
      bakedFeta: ["Vegetarian"],
      falafel: ["Vegetarian"],
      croquettes: ["Spicy"],
      // Salads
      shepherd: ["Vegetarian", "Fresh"],
      prasini: ["Vegetarian", "Fresh"],
      greek: ["Vegetarian", "Fresh"],
      // Kebabs
      adana: ["Spicy", "Chef's Special"],
      urfa: ["Mild"],
      yogurt: ["House Special"],
      iskender: ["Popular", "Chef's Special"],
      doner: ["Popular"],
      beyti: ["Spicy", "Chef's Special"],
      lambSkewers: ["Spicy"],
      chickenSkewers: ["Healthy"],
      mixedGrill: ["Popular", "Chef's Special"],
      chickenWings: ["Spicy"],
      meatballs: ["Traditional"],
      // Pides
      cheeseSucuk: ["Spicy"],
      cheeseMince: ["Popular"],
      cheeseMeat: ["Chef's Special"],
      // Sandwiches and Wraps
      donerPita: ["Popular"],
      chickenDoner: ["Healthy"],
      kebab: ["Chef's Special"],
      falafelSandwich: ["Vegetarian"],
      bereket: ["House Special"],
      donerWrap: ["Popular"],
      // Refreshments
      cola: ["Cold"],
      colaLight: ["Cold", "Sugar-Free"],
      colaZero: ["Cold", "Sugar-Free"],
      sprite: ["Cold"],
      fantaOrange: ["Cold"],
      fantaBlue: ["Cold"],
      sparklingWater: ["Cold"],
      salgam: ["Traditional", "Cold"],
      water500: ["Cold"],
      water1L: ["Cold"],
      ayran: ["Traditional", "Cold"],
      peachJuice: ["Cold", "Fresh"],
      sourCherryJuice: ["Traditional", "Cold"]
    };
    return tags[key] || [];
  };

  // Helper function to get menu items from translations
  const getMenuItems = (): MenuItem[] => {
    const items: MenuItem[] = [];
    const menuCategories = t.menu.categories as unknown as MenuCategories;

    // Add cold appetizers
    Object.entries(menuCategories["appetizers-cold"].items).forEach(([key, item]) => {
      items.push({
        id: `appetizers-cold-${key}`,
        name: item.name,
        description: item.description,
        price: item.price,
        category: "appetizers-cold",
        image: getMenuItemImage(key),
        tags: getItemTags(key),
      });
    });

    // Add hot appetizers
    Object.entries(menuCategories["appetizers-hot"].items).forEach(([key, item]) => {
      items.push({
        id: `appetizers-hot-${key}`,
        name: item.name,
        description: item.description,
        price: item.price,
        category: "appetizers-hot",
        image: getMenuItemImage(key),
        tags: getItemTags(key),
      });
    });

    // Add salads
    Object.entries(menuCategories.salads.items).forEach(([key, item]) => {
      items.push({
        id: `salads-${key}`,
        name: item.name,
        description: item.description,
        price: item.price,
        category: "salads",
        image: getMenuItemImage(key),
        tags: getItemTags(key),
      });
    });

    // Add kebabs
    Object.entries(menuCategories.kebabs.items).forEach(([key, item]) => {
      items.push({
        id: `kebabs-${key}`,
        name: item.name,
        description: item.description,
        price: item.price,
        category: "kebabs",
        image: getMenuItemImage(key),
        tags: getItemTags(key),
      });
    });

    // Add pides
    Object.entries(menuCategories.pides.items).forEach(([key, item]) => {
      items.push({
        id: `pides-${key}`,
        name: item.name,
        description: item.description,
        price: item.price,
        category: "pides",
        image: getMenuItemImage(key),
        tags: getItemTags(key),
      });
    });

    // Add sandwiches and wraps
    Object.entries(menuCategories["sandwiches-wraps"].items).forEach(([key, item]) => {
      items.push({
        id: `sandwiches-wraps-${key}`,
        name: item.name,
        description: item.description,
        price: item.price,
        category: "sandwiches-wraps",
        image: getMenuItemImage(key),
        tags: getItemTags(key),
      });
    });

    // Add refreshments
    Object.entries(menuCategories.refreshments.items).forEach(([key, item]) => {
      items.push({
        id: `refreshments-${key}`,
        name: item.name,
        description: item.description,
        price: item.price,
        category: "refreshments",
        image: getMenuItemImage(key),
        tags: getItemTags(key),
      });
    });

    return items;
  };

  const menuItems = getMenuItems();
  const filteredItems = activeCategory === "all"
    ? menuItems
    : menuItems.filter((item) => item.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
            {t.menu.title}
          </h1>
          <p className="text-xl text-gray-600">{t.menu.description}</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full transition-colors duration-300 ${
                activeCategory === category.id
                  ? "bg-accent-gold text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={item.image}
                  alt={item.name}
                  className={`w-full h-48 ${item.category === "refreshments" ? "object-contain" : "object-cover"}`}
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-playfair font-bold">{item.name}</h3>
                  <span className="text-accent-gold font-semibold">
                    €{item.price}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Menu;
