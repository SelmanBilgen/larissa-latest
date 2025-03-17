import React, { useState, useEffect, useCallback } from 'react';
import { Image as ImageIcon, Upload, Trash2, RefreshCw } from 'lucide-react';
import { listImages, uploadImage, deleteImage } from '../services/github';

interface ImageInfo {
  name: string;
  path: string;
  sha: string;
  download_url: string;
}

const ImageManager: React.FC = () => {
  const [images, setImages] = useState<ImageInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageInfo | null>(null);

  const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
  const GITHUB_OWNER = import.meta.env.VITE_GITHUB_OWNER;
  const GITHUB_REPO = import.meta.env.VITE_GITHUB_REPO;

  const fetchImages = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const imageList = await listImages(GITHUB_OWNER, GITHUB_REPO, GITHUB_TOKEN);
      setImages(imageList);
    } catch (err) {
      setError('Failed to load images. Please try again.');
      console.error('Error fetching images:', err);
    } finally {
      setLoading(false);
    }
  }, [GITHUB_OWNER, GITHUB_REPO, GITHUB_TOKEN]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

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
    await handleFiles(files);
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    await handleFiles(files);
  };

  const handleFiles = async (files: File[]) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    if (imageFiles.length === 0) {
      setError('Please select only image files.');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      await Promise.all(
        imageFiles.map(file =>
          uploadImage(
            GITHUB_OWNER,
            GITHUB_REPO,
            `src/assets/${file.name}`,
            file,
            GITHUB_TOKEN
          )
        )
      );
      await fetchImages();
    } catch (err) {
      setError('Failed to upload one or more images. Please try again.');
      console.error('Error uploading images:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (image: ImageInfo) => {
    if (!window.confirm(`Are you sure you want to delete ${image.name}?`)) {
      return;
    }

    try {
      setError(null);
      await deleteImage(
        GITHUB_OWNER,
        GITHUB_REPO,
        image.path,
        image.sha,
        GITHUB_TOKEN
      );
      await fetchImages();
    } catch (err) {
      setError('Failed to delete image. Please try again.');
      console.error('Error deleting image:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Image Manager</h2>
        
        {/* Upload Section */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-blue-400'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="mb-4">
            <ImageIcon className="w-12 h-12 mx-auto text-gray-400" />
          </div>
          <p className="text-gray-600 mb-4">
            Drag and drop images here, or click to select files
          </p>
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            id="image-upload"
            onChange={handleFileInput}
          />
          <label
            htmlFor="image-upload"
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
          >
            <Upload className="w-4 h-4 mr-2" />
            Select Images
          </label>
          {uploading && (
            <p className="mt-4 text-blue-500">Uploading images...</p>
          )}
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-600 rounded">
            {error}
          </div>
        )}
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div
            key={image.path}
            className="relative group rounded-lg overflow-hidden border border-gray-200"
          >
            <img
              src={image.download_url}
              alt={image.name}
              className="w-full h-48 object-cover"
              onClick={() => setSelectedImage(image)}
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
              <button
                onClick={() => handleDelete(image)}
                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                title="Delete image"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            <div className="p-2 bg-white border-t border-gray-200">
              <p className="text-sm truncate" title={image.name}>
                {image.name}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-4xl max-h-[90vh] overflow-auto bg-white p-4 rounded-lg">
            <img
              src={selectedImage.download_url}
              alt={selectedImage.name}
              className="max-w-full h-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageManager; 