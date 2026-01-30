import React from 'react';
import Link from 'next/link';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="bg-white shadow-sm">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold">Job Scheduler</h1>
            <span className="text-sm text-gray-500">Automation Dashboard</span>
          </div>
          <nav className="flex items-center gap-3">
            <Link href="/" className="text-sm text-gray-700 hover:text-gray-900">Dashboard</Link>
            <Link href="/create" className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">Create Job</Link>
          </nav>
        </div>
      </div>

      <main className="container py-8">
        <div className="bg-white shadow rounded p-6">{children}</div>
      </main>

      <footer className="text-center text-sm text-gray-500 py-6">Built for Dotix tech test</footer>
    </div>
  );
};

export default Layout;
