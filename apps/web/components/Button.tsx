import React from 'react';

export default function Button({ children, className = '', ...props }: any) {
  return (
    <button
      {...props}
      className={`inline-flex items-center gap-2 px-3 py-1 rounded shadow-sm text-sm ${className}`}
    >
      {children}
    </button>
  );
}
