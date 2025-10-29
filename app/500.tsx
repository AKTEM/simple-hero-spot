"use client";

import { Button } from '@/components/ui/button';
import { ServerCrash, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Custom500() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-6">
        <ServerCrash className="w-16 h-16 text-red-600 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Server Error
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          We're experiencing technical difficulties. Our team has been notified and is working to resolve the issue.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => window.location.reload()} className="bg-red-600 hover:bg-red-700">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Page
          </Button>
          <Button asChild variant="outline">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
