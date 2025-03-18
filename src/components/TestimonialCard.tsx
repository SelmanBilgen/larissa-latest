interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  image?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, role, content, image }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden h-[400px] relative group">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/60 group-hover:from-black/90 group-hover:to-black/70 transition-all duration-300"></div>
      {image && (
        <img
          src={image}
          alt={`${name}'s testimonial`}
          className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder-avatar.jpg';
          }}
        />
      )}
      <div className="relative h-full p-8 flex flex-col justify-end text-white">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-primary overflow-hidden border-2 border-white shadow-lg">
            <img
              src={image || '/placeholder-avatar.jpg'}
              alt={name}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-sm font-medium text-gray-300">{role}</p>
          </div>
        </div>
        <div className="flex gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <p className="text-sm md:text-base leading-relaxed">{content}</p>
      </div>
    </div>
  );
};

export default TestimonialCard; 