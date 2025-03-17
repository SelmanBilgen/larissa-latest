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

const Menu = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");

  // Define categories based on translation structure
  const categories = [
    { id: "all", name: "All" },
    { id: "starters", name: t.menu.categories.starters.title },
    { id: "mains", name: t.menu.categories.mains.title },
    { id: "desserts", name: t.menu.categories.desserts.title },
    { id: "drinks", name: t.menu.categories.drinks.title },
  ];

  // Helper function to get menu items from translations
  const getMenuItems = (): MenuItem[] => {
    const items: MenuItem[] = [];
    const categories = t.menu.categories;

    // Add starters
    Object.entries(categories.starters.items).forEach(([key, item]) => {
      items.push({
        id: `starters-${key}`,
        name: item.name,
        description: item.description,
        price: item.price,
        category: "starters",
        image: getItemImage(key),
        tags: getItemTags(key),
      });
    });

    // Add main courses
    Object.entries(categories.mains.items).forEach(([key, item]) => {
      items.push({
        id: `mains-${key}`,
        name: item.name,
        description: item.description,
        price: item.price,
        category: "mains",
        image: getItemImage(key),
        tags: getItemTags(key),
      });
    });

    // Add desserts
    Object.entries(categories.desserts.items).forEach(([key, item]) => {
      items.push({
        id: `desserts-${key}`,
        name: item.name,
        description: item.description,
        price: item.price,
        category: "desserts",
        image: getItemImage(key),
        tags: getItemTags(key),
      });
    });

    // Add drinks
    Object.entries(categories.drinks.items).forEach(([key, item]) => {
      items.push({
        id: `drinks-${key}`,
        name: item.name,
        description: item.description,
        price: item.price,
        category: "drinks",
        image: getItemImage(key),
        tags: getItemTags(key),
      });
    });

    return items;
  };

  // Helper function to get item images
  const getItemImage = (key: string) => {
    const images: { [key: string]: string } = {
      hummus: "src/assets/hummus.jpeg",
      babaganoush: "https://images.pexels.com/photos/5191845/pexels-photo-5191845.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      kebab: "https://images.pexels.com/photos/14523230/pexels-photo-14523230.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      pide: "https://media.istockphoto.com/id/1213769578/photo/turkish-iskender-kebab.jpg?b=1&s=612x612&w=0&k=20&c=g_Tp-KwS9iXNIJo-uV45pe2pJDYaaGXQ7005NtxxpGA=",
      baklava: "https://images.pexels.com/photos/7317605/pexels-photo-7317605.jpeg",
      kunefe: "https://media.istockphoto.com/id/1363891849/photo/arabic-traditional-dessert-kunafa-konafa-in-a-tray-with-pistachio-creative-delicious-middle.jpg?s=612x612&w=0&k=20&c=p8Ndy5uc7XPZhhePrUArJVM-NGyGzep4T4_KL9B4Axs=",
      tea: "https://media.istockphoto.com/id/1468196975/photo/black-tea-freshly-brewed-hot-traditional-turkish-tea-in-a-glass.jpg?s=612x612&w=0&k=20&c=w2tpbtz_Jo13SFFM3hzjexwk2gZsVyqrBly7y3PolpY=",
      coffee: "https://media.istockphoto.com/id/1409574129/photo/turkish-coffee.jpg?s=612x612&w=0&k=20&c=ZSjzqu5_wM8LlQkrgAIXPiI7J25L0K5DXoDhyIcaM3U="
    };
    return images[key] || "https://via.placeholder.com/400x300";
  };

  // Helper function to get item tags
  const getItemTags = (key: string) => {
    const tags: { [key: string]: string[] } = {
      hummus: ["Vegetarian", "Gluten-Free"],
      babaganoush: ["Vegetarian", "Gluten-Free"],
      kebab: ["Chef's Special"],
      pide: ["Popular"],
      baklava: ["Popular"],
      kunefe: ["Chef's Special"],
      tea: ["Hot"],
      coffee: ["Hot"]
    };
    return tags[key] || [];
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
                    {item.price}
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
