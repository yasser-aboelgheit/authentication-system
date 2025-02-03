import * as React from 'react';

export function Alert({
  children,
  variant = 'default',
}: {
  children: React.ReactNode;
  variant?: 'default' | 'destructive';
}) {
  return (
    <div
      className={`rounded-lg border p-4 ${variant === 'destructive' ? 'border-red-500 bg-red-50 text-red-700' : 'border-gray-200 bg-white'}`}
    >
      {children}
    </div>
  );
}

export function AlertDescription({ children }: { children: React.ReactNode }) {
  return <div className="text-sm">{children}</div>;
}
