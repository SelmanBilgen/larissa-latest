import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  getTranslationFiles,
  updateFile,
  listImages,
  uploadImage,
  deleteImage,
} from '../services/github';
import { Edit2, Image as ImageIcon, X, Upload, Loader } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface ImageInfo {
  name: string;
  path: string;
  url: string;
  sha: string;
}

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: ImageInfo[];
  onUpload: (file: File) => Promise<void>;
  onDelete: (imagePath: string) => Promise<void>;
  onImageSelect?: (imagePath: string) => void;
}

interface MenuItemType {
  name: string;
  description: string;
  price: string;
  image?: string;
  translations?: {
    [key: string]: {
      name: string;
      description: string;
    };
  };
}

interface MenuCategoryType {
  name: string;
  items: MenuItemType[];
}

interface TranslationObject {
  menu?: {
    categories?: {
      [key: string]: {
        name: string;
        items: {
          name: string;
          description: string;
          price: string;
          image?: string;
        }[];
      };
    };
  };
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  images,
  onUpload,
  onDelete,
  onImageSelect
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  if (!isOpen) return null;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      setUploading(true);
      try {
        await onUpload(files[0]);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setUploading(true);
      try {
        await onUpload(files[0]);
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Manage Images</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 mb-6 text-center ${
            isDragging ? 'border-accent-gold bg-accent-gold/10' : 'border-gray-300'
          }`}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-600 mb-2">Drag and drop an image here, or</p>
          <label className="inline-block">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <span className="btn-primary cursor-pointer">
              {uploading ? 'Uploading...' : 'Browse Files'}
            </span>
          </label>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div
              key={image.path}
              className="group relative aspect-square rounded-lg overflow-hidden border border-gray-200 cursor-pointer"
              onClick={() => {
                if (onImageSelect) {
                  onImageSelect(image.path);
                }
              }}
            >
              <img
                src={image.url}
                alt={image.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(image.path);
                  }}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MenuSection: React.FC<{
  categories: Record<string, MenuCategoryType>;
  onSave: (categories: Record<string, MenuCategoryType>) => Promise<void>;
  images: ImageInfo[];
  onUpload: (file: File) => Promise<void>;
  onDelete: (imagePath: string) => Promise<void>;
}> = ({ categories = {}, onSave, images, onUpload, onDelete }) => {
  const [editingItem, setEditingItem] = useState<{categoryId: string; itemIndex: number} | null>(null);
  const [newCategory, setNewCategory] = useState(false);
  const [newItem, setNewItem] = useState<string | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const normalizedCategories: Record<string, MenuCategoryType> = Object.entries(categories || {}).reduce((acc, [key, category]) => {
    acc[key] = {
      name: category?.name || '',
      items: Array.isArray(category?.items) ? category.items : []
    };
    return acc;
  }, {} as Record<string, MenuCategoryType>);

  const handleAddCategory = async (name: string) => {
    const updatedCategories = {
      ...normalizedCategories,
      [name.toLowerCase().replace(/\s+/g, '-')]: {
        name,
        items: []
      }
    };
    await onSave(updatedCategories);
    setNewCategory(false);
  };

  const handleAddItem = async (categoryId: string, item: MenuItemType) => {
    // Normalize image path if provided
    const normalizedItem = {
      ...item,
      image: item.image ? (item.image.startsWith('/') ? item.image.slice(1) : item.image) : undefined
    };

    const updatedCategories = {
      ...normalizedCategories,
      [categoryId]: {
        ...normalizedCategories[categoryId],
        items: [...(normalizedCategories[categoryId]?.items || []), normalizedItem]
      }
    };
    await onSave(updatedCategories);
    setNewItem(null);
  };

  const handleEditItem = async (categoryId: string, itemIndex: number, updatedItem: MenuItemType) => {
    const category = normalizedCategories[categoryId];
    if (!category) return;

    // Normalize image path if provided
    const normalizedItem = {
      ...updatedItem,
      image: updatedItem.image ? (updatedItem.image.startsWith('/') ? updatedItem.image.slice(1) : updatedItem.image) : undefined
    };

    const updatedCategories = {
      ...normalizedCategories,
      [categoryId]: {
        ...category,
        items: category.items.map((item, index) => 
          index === itemIndex ? normalizedItem : item
        )
      }
    };
    await onSave(updatedCategories);
    setEditingItem(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Menu Categories</h3>
        <button
          onClick={() => setNewCategory(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Category
        </button>
      </div>

      <div className="space-y-4">
        {Object.entries(normalizedCategories).map(([categoryId, category]) => (
          <div key={categoryId} className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-medium">{category.name}</h4>
              <button
                onClick={() => setNewItem(categoryId)}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Add Item
              </button>
            </div>

            <div className="grid gap-4">
              {category.items.map((item, index) => (
                <div key={index} className="border rounded p-3 flex justify-between items-center">
                  <div>
                    <h5 className="font-medium">{item.name}</h5>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <p className="text-sm font-medium">{item.price}</p>
                    {item.image && (
                      <img 
                        src={item.image.startsWith('http') ? item.image : item.image.startsWith('/') ? item.image : `/${item.image}`} 
                        alt={item.name} 
                        className="w-20 h-20 object-cover mt-2 rounded" 
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/src/assets/placeholder.jpg';
                          target.onerror = null;
                        }}
                      />
                    )}
                  </div>
                  <button
                    onClick={() => setEditingItem({ categoryId, itemIndex: index })}
                    className="p-2 text-blue-500 hover:text-blue-600"
                  >
                    <Edit2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {newCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New Category</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                handleAddCategory(formData.get('name') as string);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium mb-1">Category Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setNewCategory(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {newItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Add New Menu Item</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const price = formData.get('price') as string;
                
                // Collect translations
                const translations: { [key: string]: { name: string; description: string } } = {};
                ['el', 'tr'].forEach(lang => {
                  const name = formData.get(`name_${lang}`) as string;
                  const description = formData.get(`description_${lang}`) as string;
                  if (name || description) {
                    translations[lang] = {
                      name: name || formData.get('name') as string,
                      description: description || formData.get('description') as string
                    };
                  }
                });

                handleAddItem(newItem, {
                  name: formData.get('name') as string,
                  description: formData.get('description') as string,
                  price: price.toString(),
                  image: formData.get('image') as string || undefined,
                  translations
                });
              }}
              className="space-y-4"
            >
              <div className="border-b pb-4 mb-4">
                <h4 className="font-medium mb-2">English (Default)</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Item Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                      name="description"
                      required
                      className="w-full p-2 border rounded"
                      rows={2}
                    />
                  </div>
                </div>
              </div>

              <div className="border-b pb-4 mb-4">
                <h4 className="font-medium mb-2">Greek Translation</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Item Name (Greek)</label>
                    <input
                      type="text"
                      name="name_el"
                      className="w-full p-2 border rounded"
                      placeholder="Leave empty to use English name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Description (Greek)</label>
                    <textarea
                      name="description_el"
                      className="w-full p-2 border rounded"
                      rows={2}
                      placeholder="Leave empty to use English description"
                    />
                  </div>
                </div>
              </div>

              <div className="border-b pb-4 mb-4">
                <h4 className="font-medium mb-2">Turkish Translation</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Item Name (Turkish)</label>
                    <input
                      type="text"
                      name="name_tr"
                      className="w-full p-2 border rounded"
                      placeholder="Leave empty to use English name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Description (Turkish)</label>
                    <textarea
                      name="description_tr"
                      className="w-full p-2 border rounded"
                      rows={2}
                      placeholder="Leave empty to use English description"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Price</label>
                <input
                  type="number"
                  name="price"
                  required
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  className="w-full p-2 border rounded"
                />
                <p className="text-sm text-gray-500 mt-1">Enter price in format: 0.00 (e.g., 12.99)</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image Path (Optional)</label>
                <input
                  type="text"
                  name="image"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setNewItem(null)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Edit Menu Item</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const price = formData.get('price') as string;

                // Collect translations
                const translations: { [key: string]: { name: string; description: string } } = {};
                ['el', 'tr'].forEach(lang => {
                  const name = formData.get(`name_${lang}`) as string;
                  const description = formData.get(`description_${lang}`) as string;
                  if (name || description) {
                    translations[lang] = {
                      name: name || formData.get('name') as string,
                      description: description || formData.get('description') as string
                    };
                  }
                });

                handleEditItem(
                  editingItem.categoryId,
                  editingItem.itemIndex,
                  {
                    name: formData.get('name') as string,
                    description: formData.get('description') as string,
                    price: price.toString(),
                    image: formData.get('image') as string || undefined,
                    translations
                  }
                );
              }}
              className="space-y-4"
            >
              <div className="border-b pb-4 mb-4">
                <h4 className="font-medium mb-2">English (Default)</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Item Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      defaultValue={normalizedCategories[editingItem.categoryId].items[editingItem.itemIndex].name}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                      name="description"
                      required
                      defaultValue={normalizedCategories[editingItem.categoryId].items[editingItem.itemIndex].description}
                      className="w-full p-2 border rounded"
                      rows={2}
                    />
                  </div>
                </div>
              </div>

              <div className="border-b pb-4 mb-4">
                <h4 className="font-medium mb-2">Greek Translation</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Item Name (Greek)</label>
                    <input
                      type="text"
                      name="name_el"
                      defaultValue={normalizedCategories[editingItem.categoryId].items[editingItem.itemIndex].translations?.el?.name}
                      className="w-full p-2 border rounded"
                      placeholder="Leave empty to use English name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Description (Greek)</label>
                    <textarea
                      name="description_el"
                      defaultValue={normalizedCategories[editingItem.categoryId].items[editingItem.itemIndex].translations?.el?.description}
                      className="w-full p-2 border rounded"
                      rows={2}
                      placeholder="Leave empty to use English description"
                    />
                  </div>
                </div>
              </div>

              <div className="border-b pb-4 mb-4">
                <h4 className="font-medium mb-2">Turkish Translation</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Item Name (Turkish)</label>
                    <input
                      type="text"
                      name="name_tr"
                      defaultValue={normalizedCategories[editingItem.categoryId].items[editingItem.itemIndex].translations?.tr?.name}
                      className="w-full p-2 border rounded"
                      placeholder="Leave empty to use English name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Description (Turkish)</label>
                    <textarea
                      name="description_tr"
                      defaultValue={normalizedCategories[editingItem.categoryId].items[editingItem.itemIndex].translations?.tr?.description}
                      className="w-full p-2 border rounded"
                      rows={2}
                      placeholder="Leave empty to use English description"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Price</label>
                <input
                  type="number"
                  name="price"
                  required
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  defaultValue={normalizedCategories[editingItem.categoryId].items[editingItem.itemIndex].price}
                  className="w-full p-2 border rounded"
                />
                <p className="text-sm text-gray-500 mt-1">Enter price in format: 0.00 (e.g., 12.99)</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image</label>
                <div className="space-y-4">
                  {/* Current Image Preview */}
                  {editingItem && normalizedCategories[editingItem.categoryId]?.items[editingItem.itemIndex]?.image && (
                    <div className="relative w-32 h-32 border rounded overflow-hidden">
                      <img 
                        src={normalizedCategories[editingItem.categoryId]?.items[editingItem.itemIndex]?.image?.startsWith('http') 
                          ? normalizedCategories[editingItem.categoryId]?.items[editingItem.itemIndex]?.image 
                          : `/${normalizedCategories[editingItem.categoryId]?.items[editingItem.itemIndex]?.image}`
                        } 
                        alt="Current item image" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/src/assets/placeholder.jpg';
                          target.onerror = null;
                        }}
                      />
                    </div>
                  )}
                  
                  {/* Image Path Input and Select Button */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="image"
                      defaultValue={normalizedCategories[editingItem.categoryId].items[editingItem.itemIndex].image}
                      className="flex-1 p-2 border rounded"
                      placeholder="Image path (e.g., src/assets/image.jpg)"
                    />
                    <button
                      type="button"
                      onClick={() => setIsImageModalOpen(true)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 flex items-center gap-2"
                    >
                      <ImageIcon size={16} />
                      Browse
                    </button>
                  </div>
                  <p className="text-sm text-gray-500">Click Browse to select an image from your assets</p>
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add ImageModal inside MenuSection */}
      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        images={images}
        onUpload={onUpload}
        onDelete={onDelete}
        onImageSelect={(imagePath) => {
          if (editingItem) {
            const imageInput = document.querySelector('input[name="image"]') as HTMLInputElement;
            if (imageInput) {
              imageInput.value = imagePath;
            }
          }
          setIsImageModalOpen(false);
          toast.success('Image selected!');
        }}
      />
    </div>
  );
};

const Admin: React.FC = () => {
  const { language, t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<ImageInfo[]>([]);
  const [currentFileSha, setCurrentFileSha] = useState<string>('');

  useEffect(() => {
    fetchContent();
    fetchImages();
  }, [language]);

  const fetchContent = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getTranslationFiles(
        import.meta.env.VITE_GITHUB_OWNER,
        import.meta.env.VITE_GITHUB_REPO,
        import.meta.env.VITE_GITHUB_TOKEN
      );
      
      if (response && response.length > 0) {
        setCurrentFileSha(response[0].sha);
      }
    } catch (err) {
      setError('Failed to load content. Please try again.');
      console.error('Error loading content:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchImages = async () => {
    try {
      const imageList = await listImages(
        import.meta.env.VITE_GITHUB_OWNER,
        import.meta.env.VITE_GITHUB_REPO,
        import.meta.env.VITE_GITHUB_TOKEN
      );
      
      const transformedImages: ImageInfo[] = imageList.map(img => ({
        name: img.name,
        path: img.path,
        url: img.download_url,
        sha: img.sha
      }));
      
      setImages(transformedImages);
    } catch (err) {
      console.error('Error loading images:', err);
      toast.error('Failed to load images');
    }
  };

  const handleUploadImage = async (file: File) => {
    try {
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }

      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      await uploadImage(
        import.meta.env.VITE_GITHUB_OWNER,
        import.meta.env.VITE_GITHUB_REPO,
        `src/assets/${file.name}`,
        file,
        import.meta.env.VITE_GITHUB_TOKEN
      );
      toast.success('Image uploaded successfully!');
      fetchImages();
    } catch (err) {
      toast.error('Failed to upload image');
      console.error('Error uploading image:', err);
    }
  };

  const handleDeleteImage = async (imagePath: string) => {
    try {
      const imageToDelete = images.find(img => img.path === imagePath);
      if (!imageToDelete) {
        throw new Error('Image not found');
      }
      
      await deleteImage(
        import.meta.env.VITE_GITHUB_OWNER,
        import.meta.env.VITE_GITHUB_REPO,
        imagePath,
        imageToDelete.sha,
        import.meta.env.VITE_GITHUB_TOKEN
      );
      toast.success('Image deleted successfully!');
      fetchImages();
    } catch (err) {
      toast.error('Failed to delete image');
      console.error('Error deleting image:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Menu Management</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">
            Current Language: {language.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <MenuSection
          categories={(() => {
            const menuCategories = (t as any)?.menu?.categories || {};
            // Transform the categories to match our expected format
            const transformedCategories: Record<string, MenuCategoryType> = {};
            
            Object.entries(menuCategories).forEach(([key, category]: [string, any]) => {
              transformedCategories[key] = {
                name: category.title || key,
                items: Array.isArray(category.items) 
                  ? category.items 
                  : Object.entries(category.items || {}).map(([_, item]: [string, any]) => ({
                      name: item.name,
                      description: item.description,
                      price: item.price,
                      image: item.image
                    }))
              };
            });
            
            return transformedCategories;
          })()}
          onSave={async (updatedCategories) => {
            try {
              setSaving(true);
              
              // Update all language files
              const languages = ['en', 'el', 'tr'];
              for (const lang of languages) {
                try {
                  // Get the current content of each language file
                  const response = await getTranslationFiles(
                    import.meta.env.VITE_GITHUB_OWNER,
                    import.meta.env.VITE_GITHUB_REPO,
                    import.meta.env.VITE_GITHUB_TOKEN
                  );

                  if (response && response.length > 0) {
                    const currentFile = response.find(file => file.path.includes(`/${lang}.ts`));
                    if (!currentFile) continue;

                    const fileContent = JSON.parse(currentFile.content);
                    
                    // Create language-specific categories with translations
                    const languageCategories: any = {};
                    Object.entries(updatedCategories).forEach(([key, category]) => {
                      languageCategories[key] = {
                        title: category.name,
                        items: category.items.map(item => ({
                          name: lang === 'en' ? item.name : (item.translations?.[lang]?.name || item.name),
                          description: lang === 'en' ? item.description : (item.translations?.[lang]?.description || item.description),
                          price: item.price,
                          ...(item.image && { image: item.image })
                        }))
                      };
                    });

                    const updatedTranslations = {
                      ...fileContent,
                      menu: {
                        ...(fileContent.menu || {}),
                        categories: languageCategories
                      }
                    };

                    const content = `export default ${JSON.stringify(updatedTranslations, null, 2)};`;

                    await updateFile(
                      import.meta.env.VITE_GITHUB_OWNER,
                      import.meta.env.VITE_GITHUB_REPO,
                      `src/translations/${lang}.ts`,
                      content,
                      currentFile.sha,
                      `Update menu categories for ${lang.toUpperCase()}`,
                      import.meta.env.VITE_GITHUB_TOKEN
                    );
                  }
                } catch (err) {
                  console.error(`Error updating ${lang} translations:`, err);
                  toast.error(`Failed to update ${lang.toUpperCase()} translations`);
                }
              }

              toast.success('Changes saved successfully to all languages!');
              window.location.reload();
            } catch (err) {
              toast.error('Failed to save changes');
              console.error('Error saving changes:', err);
            } finally {
              setSaving(false);
            }
          }}
          images={images}
          onUpload={handleUploadImage}
          onDelete={handleDeleteImage}
        />
      </div>

      {error && (
        <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {saving && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 flex items-center space-x-3">
            <Loader className="w-6 h-6 animate-spin text-blue-500" />
            <span>Saving changes...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin; 