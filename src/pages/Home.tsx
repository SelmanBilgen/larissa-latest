import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import backgroundImage from "../assets/hero-karisik-tabaklar-1.jpg";
import { useLanguage } from "../context/LanguageContext";

const Home = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { t } = useLanguage();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundAttachment: "fixed",
          }}
        ></div>

        <div className="container mx-auto px-4 md:px-6 relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white max-w-3xl mx-auto"
          >
            <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-4">
              {t.home.hero.title}
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              {t.home.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/menu" className="btn-primary">
                {t.home.hero.cta}
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 0.5,
            }}
          >
            <ArrowRight className="h-10 w-10 text-white transform rotate-90" />
          </motion.div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-16 md:py-24 bg-greek-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="section-title text-center">{t.home.specialties.title}</h2>
            <p className="text-lg max-w-3xl mx-auto">
              {t.home.specialties.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(t.home.specialties.items).map(([key, dish]) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={getSpecialtyImage(key)}
                    alt={dish.name}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-playfair font-bold mb-2">
                    {dish.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{dish.description}</p>
                  <p className="text-accent-gold font-semibold">{dish.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="section-title text-center">{t.home.testimonials.title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.home.testimonials.items.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={getTestimonialImage(index)}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <h3 className="font-semibold">{testimonial.name}</h3>
                </div>
                <p className="text-gray-600 italic">{testimonial.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper function to get specialty images
const getSpecialtyImage = (key: string) => {
  const images = {
    adanaKebab: "https://images.pexels.com/photos/14523230/pexels-photo-14523230.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    turkishRavioli: "https://images.pexels.com/photos/13563237/pexels-photo-13563237.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    baklava: "https://images.pexels.com/photos/7317605/pexels-photo-7317605.jpeg"
  };
  return images[key as keyof typeof images];
};

// Helper function to get testimonial images
const getTestimonialImage = (index: number) => {
  const images = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
  ];
  return images[index];
};

export default Home;
