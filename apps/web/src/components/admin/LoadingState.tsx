/**
 * LoadingState Component
 * Skeleton loaders for data fetching states
 */

interface LoadingStateProps {
  type?: 'card' | 'table' | 'chart' | 'text';
  count?: number;
}

export function LoadingState({ type = 'card', count = 1 }: LoadingStateProps) {
  if (type === 'card') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-lg p-6"
            style={{ backgroundColor: '#222222', border: '1px solid #363636' }}
          >
            <div
              className="h-4 rounded mb-4"
              style={{ backgroundColor: '#363636', width: '60%' }}
            ></div>
            <div
              className="h-8 rounded mb-2"
              style={{ backgroundColor: '#363636', width: '80%' }}
            ></div>
            <div className="h-3 rounded" style={{ backgroundColor: '#363636', width: '40%' }}></div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className="animate-pulse">
        <div className="rounded-lg overflow-hidden" style={{ border: '1px solid #363636' }}>
          {/* Table header */}
          <div className="flex gap-4 p-4" style={{ backgroundColor: '#222222' }}>
            <div className="h-4 rounded" style={{ backgroundColor: '#363636', width: '25%' }}></div>
            <div className="h-4 rounded" style={{ backgroundColor: '#363636', width: '25%' }}></div>
            <div className="h-4 rounded" style={{ backgroundColor: '#363636', width: '25%' }}></div>
            <div className="h-4 rounded" style={{ backgroundColor: '#363636', width: '25%' }}></div>
          </div>
          {/* Table rows */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex gap-4 p-4"
              style={{
                backgroundColor: i % 2 === 0 ? '#171717' : '#1C1C1C',
                borderTop: '1px solid #363636',
              }}
            >
              <div
                className="h-4 rounded"
                style={{ backgroundColor: '#363636', width: '25%' }}
              ></div>
              <div
                className="h-4 rounded"
                style={{ backgroundColor: '#363636', width: '25%' }}
              ></div>
              <div
                className="h-4 rounded"
                style={{ backgroundColor: '#363636', width: '25%' }}
              ></div>
              <div
                className="h-4 rounded"
                style={{ backgroundColor: '#363636', width: '25%' }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'chart') {
    return (
      <div className="animate-pulse rounded-lg p-6" style={{ backgroundColor: '#222222' }}>
        <div className="h-64 rounded" style={{ backgroundColor: '#363636' }}></div>
      </div>
    );
  }

  // Default: text loading
  return (
    <div className="animate-pulse">
      <div className="h-4 rounded mb-2" style={{ backgroundColor: '#363636', width: '100%' }}></div>
      <div className="h-4 rounded mb-2" style={{ backgroundColor: '#363636', width: '80%' }}></div>
      <div className="h-4 rounded" style={{ backgroundColor: '#363636', width: '60%' }}></div>
    </div>
  );
}
