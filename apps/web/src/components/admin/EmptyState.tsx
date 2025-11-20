/**
 * EmptyState Component
 * Displays when no data is available
 */

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export function EmptyState({ title, description, icon }: EmptyStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center py-12 rounded-lg"
      style={{ backgroundColor: '#222222', border: '1px solid #363636' }}
    >
      {icon ? (
        <div style={{ color: '#757575', fontSize: '48px' }} className="mb-4">
          {icon}
        </div>
      ) : (
        <svg
          className="mb-4"
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="64" height="64" rx="12" fill="#363636" />
          <path
            d="M32 20V44M20 32H44"
            stroke="#757575"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      <h3
        style={{
          fontFamily: 'var(--font-poppins)',
          fontSize: '20px',
          fontWeight: 600,
          color: '#E8E8E8',
          marginBottom: '8px',
        }}
      >
        {title}
      </h3>
      {description && (
        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '15px',
            color: '#898989',
            textAlign: 'center',
            maxWidth: '400px',
            lineHeight: '1.6',
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
