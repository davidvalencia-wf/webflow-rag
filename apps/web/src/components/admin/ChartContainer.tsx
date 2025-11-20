/**
 * ChartContainer Component
 * Wrapper for charts with consistent styling
 */

interface ChartContainerProps {
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export function ChartContainer({ title, children, actions }: ChartContainerProps) {
  return (
    <div
      className="rounded-lg p-6 card-lift"
      style={{ backgroundColor: '#222222', border: '1px solid #363636' }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3
          style={{
            fontFamily: 'var(--font-poppins)',
            fontSize: '20px',
            fontWeight: 600,
            color: '#FFFFFF',
          }}
        >
          {title}
        </h3>
        {actions && <div>{actions}</div>}
      </div>
      {children}
    </div>
  );
}
