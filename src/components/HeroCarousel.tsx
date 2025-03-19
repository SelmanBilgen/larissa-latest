import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import heroImage1 from '../assets/hero/1.jpg';
import heroImage2 from '../assets/hero/2.jpg';
import heroImage3 from '../assets/hero/3.jpg';
import heroImage4 from '../assets/hero/4.jpg';
import heroImage5 from '../assets/hero/5.jpg';

const images = [
  heroImage1,
  heroImage2,
  heroImage3,
  heroImage4,
  heroImage5
];

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Images Container */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`Restaurant Hero ${index + 1}`}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
            />
            {/* Overlay with gradient - increased opacity */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-0 flex items-center justify-between px-4">
        <button
          type="button"
          onClick={handlePrevious}
          className="z-30 cursor-pointer hover:bg-black/75 hover:scale-110 active:scale-95 bg-black/50 text-white p-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-7 h-7" />
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="z-30 cursor-pointer hover:bg-black/75 hover:scale-110 active:scale-95 bg-black/50 text-white p-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Next slide"
        >
          <ChevronRight className="w-7 h-7" />
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 focus:outline-none focus:ring-2 focus:ring-white ${
              currentIndex === index 
                ? 'bg-white scale-110' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel; 