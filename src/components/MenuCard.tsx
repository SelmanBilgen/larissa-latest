import Image from 'next/image';

interface MenuCardProps {
  name: string;
  description: string;
  price: string;
  image: string;
}

const MenuCard: React.FC<MenuCardProps> = ({ name, description, price, image }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder-food.jpg'; // Fallback image
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <p className="text-primary font-semibold">{price}</p>
      </div>
    </div>
  );
};

export default MenuCard; 