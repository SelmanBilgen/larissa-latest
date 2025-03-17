//import React from "react";
import { motion } from "framer-motion";
import { Award, Users, Clock, MapPin } from "lucide-react";
import restaurantOutside from "../assets/about-1.jpg";
import restaurantInside from "../assets/about-2.jpg";
import { useLanguage } from "../context/LanguageContext";

const About = () => {
  const { t } = useLanguage();

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  const teamMembers = [
    {
      name: "Mehmet Yilmaz",
      role: "Head Chef",
      bio: "Trained in Istanbul's finest restaurants, Mehmet brings 20 years of culinary expertise to every dish.",
      image:
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-1.2.1&auto=format&fit=crop&w=384&q=80",
    },
    {
      name: "Ayşe Kaya",
      role: "Pastry Chef",
      bio: "Specializing in traditional Turkish desserts, Ayşe creates sweet masterpieces that transport you to the streets of Istanbul.",
      image:
        "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?ixlib=rb-1.2.1&auto=format&fit=crop&w=384&q=80",
    },
    {
      name: "Dimitris Papadopoulos",
      role: "Restaurant Manager",
      bio: "With a passion for hospitality, Dimitris ensures every guest enjoys an authentic and memorable dining experience.",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=384&q=80",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${restaurantOutside})` }}
        ></div>
        <div className="relative z-20 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-playfair font-bold mb-4"
          >
            {t.about.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl"
          >
            {t.about.description}
          </motion.p>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-playfair font-bold mb-6">
                {t.about.history.title}
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                {t.about.history.content}
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <Award className="h-8 w-8 text-accent-gold" />
                  <div>
                    <h3 className="font-bold">Quality</h3>
                    <p className="text-sm text-gray-600">Premium ingredients</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-8 w-8 text-accent-gold" />
                  <div>
                    <h3 className="font-bold">Team</h3>
                    <p className="text-sm text-gray-600">Expert chefs</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-8 w-8 text-accent-gold" />
                  <div>
                    <h3 className="font-bold">Experience</h3>
                    <p className="text-sm text-gray-600">Since 2010</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-8 w-8 text-accent-gold" />
                  <div>
                    <h3 className="font-bold">Location</h3>
                    <p className="text-sm text-gray-600">Heart of Larissa</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-[400px] rounded-lg overflow-hidden shadow-xl"
            >
              <img
                src={restaurantInside}
                alt="Restaurant Interior"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-playfair font-bold mb-4">
              {t.about.team.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.about.team.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                custom={index}
                variants={fadeInUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="aspect-w-1 aspect-h-1">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-accent-gold mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-playfair font-bold mb-4">
              {t.about.values.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(t.about.values.items).map(([key, value], index) => (
              <motion.div
                key={key}
                custom={index}
                variants={fadeInUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-gray-50 rounded-lg p-8 text-center"
              >
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
