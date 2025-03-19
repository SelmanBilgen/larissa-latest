/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "turkish-red": "#d2691e",
        "turkish-blue": "#00A8E8",
        "greek-blue": "#0D5EAF",
        "greek-white": "#f0f8fc",
        "accent-gold": "#D4AF37",
        "light-text": "#c1c1c1",
        "dark-text": "#555555",
      },
      fontFamily: {
        playfair: ['"Playfair Display"', "serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        "hero-pattern":
          "url('https://images.unsplash.com/photo-1561296160-7c5614c9c4ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
        "about-pattern":
          "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80')",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.6s ease-out forwards",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
