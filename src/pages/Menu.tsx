import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

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
  const getItemImage = (key: string) => {
    const images: { [key: string]: string } = {
      // Cold Appetizers
      turkishSalsa: "src/assets/menu/ezme.jpg",
      tzatziki: "/src/assets/menu/cacik.jpg",
      smokedEggplant: "/src/assets/menu/patlican-salatasi.jpg",
      hummus: "/src/assets/menu/humus.jpeg",
      veganMeatballs: "/src/assets/menu/cig-kofte.jpg",
      // Hot Appetizers
      lahmacun: "/src/assets/menu/Lahmacun.jpg",
      halloumi: "/src/assets/menu/hellim-kizartma.jpg",
      crispyCheese: "/src/assets/menu/sigara.jpg",
      frenchFries: "/src/assets/menu/patates-kizartmasi.jpg",
      patsaSoup: "/src/assets/menu/mercimek-corbasi.jpg",
      lentilSoup: "/src/assets/menu/mercimek-corbasi.jpg",
      bakedFeta: "/src/assets/menu/hellim-kizartma.jpg",
      falafel: "/src/assets/menu/falafel.jpg",
      croquettes: "/src/assets/menu/icli-kofte.jpg",
      // Salads
      shepherd: "/src/assets/menu/coban-salatasi.jpg",
      prasini: "/src/assets/menu/prasini-salata.jpg",
      greek: "/src/assets/menu/yunan-salatasi.jpg",
      // Kebabs
      adana: "/src/assets/menu/adana-kebap.jpeg",
      urfa: "/src/assets/menu/adana-kebap.jpeg",
      yogurt: "/src/assets/menu/Kebap-yogurlu.jpg",
      iskender: "/src/assets/menu/iskender.jpeg",
      doner: "/src/assets/menu/et-doner.jpeg",
      beyti: "/src/assets/menu/beyti.jpg",
      lambSkewers: "/src/assets/menu/sis-kebap-et.jpeg",
      chickenSkewers: "/src/assets/menu/tavuk-sis.jpeg",
      mixedGrill: "/src/assets/menu/karisik-kebap.jpeg",
      chickenWings: "/src/assets/menu/tavuk-kanat-sis.jpeg",
      meatballs: "/src/assets/menu/kofte.png",
      // Pides
      cheeseSucuk: "/src/assets/menu/kiymali-sucuklu-pide.jpg",
      cheeseMince: "/src/assets/menu/Kasarli-kiymali-pide.jpg",
      cheeseMeat: "/src/assets/menu/kasarli-kusbasili-pide.jpg",
      // Sandwiches and Wraps
      donerPita: "/src/assets/menu/Doner-sandwich.jpg",
      chickenDoner: "/src/assets/menu/tavuk-sandwich.jpg",
      kebab: "/src/assets/menu/adana-sandwich.jpg",
      falafelSandwich: "/src/assets/menu/falafel-sandwich.jpg",
      bereket: "/src/assets/menu/Kebap-yogurlu.jpg",
      donerWrap: "/src/assets/menu/doner-durum.jpg",
      // Refreshments
      cola: "/src/assets/menu/cola.jpg",
      colaLight: "/src/assets/menu/cola-light.jpeg",
      colaZero: "/src/assets/menu/cola-zero.jpeg",
      sprite: "/src/assets/menu/sprite.jpg",
      fantaOrange: "/src/assets/menu/fanta-orange.jpg",
      fantaBlue: "/src/assets/menu/fanta-blue.jpg",
      sparklingWater: "/src/assets/menu/beypazari.jpg",
      salgam: "/src/assets/menu/salgam.png",
      water500: "/src/assets/menu/su500.jpg",
      water1L: "/src/assets/menu/su1lt.png",
      ayran: "/src/assets/menu/ayran.png",
      peachJuice: "/src/assets/menu/seftali.jpg",
      sourCherryJuice: "/src/assets/menu/visne.jpg"
    };
    return images[key] || "/src/assets/menu/30.jpg";
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
        image: getItemImage(key),
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
        image: getItemImage(key),
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
        image: getItemImage(key),
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
        image: getItemImage(key),
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
        image: getItemImage(key),
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
        image: getItemImage(key),
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
        image: getItemImage(key),
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
                  className="w-full h-48 object-cover"
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
