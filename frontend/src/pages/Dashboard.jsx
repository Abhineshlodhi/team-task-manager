import React, { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0, overdue: 0 });

  useEffect(() => {
    api.get('/dashboard/stats/')
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-primary-600">TaskManager</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 font-medium">Hello, {user?.first_name || user?.email} ({user?.role})</span>
              <button onClick={logout} className="text-sm text-gray-500 hover:text-gray-700 transition">Logout</button>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">Dashboard</h2>
          <Link to="/projects" className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition">
            View Projects
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center hover:shadow-md transition">
            <dt className="truncate text-sm font-medium text-gray-500">Total Tasks</dt>
            <dd className="mt-2 text-4xl font-extrabold text-gray-900">{stats.total}</dd>
          </div>
          <div className="bg-white overflow-hidden rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center hover:shadow-md transition">
            <dt className="truncate text-sm font-medium text-gray-500">Completed</dt>
            <dd className="mt-2 text-4xl font-extrabold text-green-600">{stats.completed}</dd>
          </div>
          <div className="bg-white overflow-hidden rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center hover:shadow-md transition">
            <dt className="truncate text-sm font-medium text-gray-500">Pending</dt>
            <dd className="mt-2 text-4xl font-extrabold text-amber-500">{stats.pending}</dd>
          </div>
          <div className="bg-white overflow-hidden rounded-2xl shadow-sm border border-red-100 p-6 flex flex-col items-center justify-center hover:shadow-md transition bg-red-50/30">
            <dt className="truncate text-sm font-medium text-red-500">Overdue</dt>
            <dd className="mt-2 text-4xl font-extrabold text-red-600">{stats.overdue}</dd>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
