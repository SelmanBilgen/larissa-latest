import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to a server
    console.log("Form submitted:", formData);

    // Simulate a successful submission
    setFormStatus({
      submitted: true,
      success: true,
      message: t.contact.form.success,
    });

    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      guests: "2",
      message: "",
    });
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6 text-turkish-red" />,
      title: t.contact.info.address.label,
      details: t.contact.info.address.value,
    },
    {
      icon: <Phone className="h-6 w-6 text-turkish-red" />,
      title: t.contact.info.phone.label,
      details: t.contact.info.phone.value,
    },
    {
      icon: <Mail className="h-6 w-6 text-turkish-red" />,
      title: t.contact.info.email.label,
      details: t.contact.info.email.value,
    },
    {
      icon: <Clock className="h-6 w-6 text-turkish-red" />,
      title: t.contact.hours.title,
      details: `${t.contact.hours.weekdays}\n${t.contact.hours.weekends}`,
    },
  ];

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
    <div className="pt-24 pb-16 bg-greek-white min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4 text-turkish-red">
            {t.contact.title}
          </h1>
          <p className="text-lg max-w-3xl mx-auto">
            {t.contact.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <div className="flex items-center mb-3">
                    {item.icon}
                    <h3 className="ml-3 font-playfair font-bold text-lg">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 whitespace-pre-line">
                    {item.details}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Map */}
            <motion.div
              variants={itemVariants}
              className="rounded-lg overflow-hidden shadow-lg h-80"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3893.609603167032!2d23.7226518764388!3d37.99191999962101!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a1bd2d082d3a9f%3A0x21016ad04bb8dcf9!2zzpnOv8-FzrvOuc6xzr3Ov8-NIDgxLCDOkc64zq7Ovc6xIDEwNCAzOQ!5e1!3m2!1sel!2sgr!4v1740708607224!5m2!1sel!2sgr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                title="Restaurant Location"
              ></iframe>
            </motion.div>
          </motion.div>

          {/* Reservation Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-playfair font-bold mb-6 text-greek-blue">
              {t.contact.form.title}
            </h2>

            {formStatus.submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-6 rounded-lg ${
                  formStatus.success
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                <p className="text-lg font-medium">{formStatus.message}</p>
                <button
                  onClick={() =>
                    setFormStatus({
                      submitted: false,
                      success: false,
                      message: "",
                    })
                  }
                  className="mt-4 text-sm font-medium underline"
                >
                  {t.contact.form.newReservation}
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {t.contact.form.name}*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {t.contact.form.email}*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {t.contact.form.phone}*
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="+30 123 456 7890"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="guests"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {t.contact.form.guestsLabel}*
                    </label>
                    <select
                      id="guests"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      required
                      className="input-field"
                    >
                      {[...Array(10)].map((_, i) => (
                        <option key={i} value={i + 1}>
                          {i + 1} {i === 0 ? t.contact.form.guest : t.contact.form.guestsText}
                        </option>
                      ))}
                      <option value="10+">{t.contact.form.moreGuests}</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {t.contact.form.date}*
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="input-field"
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="time"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {t.contact.form.time}*
                    </label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t.contact.form.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="input-field"
                    placeholder={t.contact.form.messagePlaceholder}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary flex items-center justify-center"
                >
                  <Send className="h-5 w-5 mr-2" />
                  {t.contact.form.submit}
                </button>

                <p className="text-sm text-gray-500 mt-4">
                  {t.contact.form.requiredFields}
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
