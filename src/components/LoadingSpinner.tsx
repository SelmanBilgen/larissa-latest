interface LoadingSpinnerProps {
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ fullScreen = false }) => {
  const spinnerClasses = fullScreen
    ? "fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50"
    : "flex items-center justify-center p-4";

  return (
    <div className={spinnerClasses}>
      <div className="relative">
        <div className="w-12 h-12 border-4 border-blue-200 rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-blue-500 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner; 