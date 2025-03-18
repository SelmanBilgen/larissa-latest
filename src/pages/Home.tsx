import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import backgroundImage from "../assets/hero-karisik-tabaklar-1.jpg";
import { useLanguage } from "../context/LanguageContext";
// Import specialty images
import adanaKebabImg from "../assets/menu/adana-kebap.jpeg";
import iskenderImg from "../assets/menu/iskender.jpeg";
import kuzuSisImg from "../assets/menu/sis-kebap-et.jpeg";

const Home = () => {
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
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-playfair font-bold mb-4">
              {t.home.testimonials.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.home.testimonials.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.home.testimonials.items.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative h-[400px] bg-white rounded-lg shadow-xl overflow-hidden group hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 z-10 group-hover:from-black/85 group-hover:via-black/65 group-hover:to-black/85 transition-all duration-300"></div>
                <div
                  className="absolute inset-0 bg-cover bg-center z-0 group-hover:scale-105 transition-transform duration-300"
                  style={{ backgroundImage: `url(${getTestimonialImage(index)})` }}
                ></div>
                <div className="relative z-20 p-4 md:p-8 text-white h-full flex flex-col justify-end">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-accent-gold flex items-center justify-center mr-4 shadow-lg">
                      <span className="text-xl font-bold text-white">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-1" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>
                        {testimonial.name}
                      </h3>
                      <p className="text-accent-gold font-medium">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400 drop-shadow-lg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-100 text-sm md:text-lg leading-relaxed flex-grow" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>
                    {testimonial.text}
                  </p>
                </div>
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
  const images: { [key: string]: string } = {
    adanaKebab: adanaKebabImg,
    iskender: iskenderImg,
    kuzuSis: kuzuSisImg
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
