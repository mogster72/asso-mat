import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-dark-900">
      <DashboardHeader />
      <div className="flex pt-16 lg:pt-0">
        <DashboardSidebar />
        <main className="flex-1 p-4 sm:p-6 lg:ml-64 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}