import { ComponentType, Suspense } from 'react';
import LoadingSpinner from './LoadingSpinner';
import ErrorBoundary from './ErrorBoundary';

interface WithLoadingProps {
  isLoading?: boolean;
  error?: Error;
}

function withLoading<P extends object>(WrappedComponent: ComponentType<P>) {
  return function WithLoadingComponent(props: P & WithLoadingProps) {
    const { isLoading, error, ...componentProps } = props;

    if (error) {
      throw error;
    }

    if (isLoading) {
      return <LoadingSpinner fullScreen />;
    }

    return (
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <WrappedComponent {...(componentProps as P)} />
        </Suspense>
      </ErrorBoundary>
    );
  };
}

export default withLoading; 