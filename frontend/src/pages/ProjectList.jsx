import React, { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    api.get('/projects/')
      .then(res => setProjects(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Projects</h2>
            <p className="mt-1 text-sm text-gray-500">Manage your projects and team members.</p>
          </div>
          <Link to="/dashboard" className="text-sm font-medium text-primary-600 hover:text-primary-500">
            &larr; Back to Dashboard
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map(project => (
            <Link key={project.id} to={`/projects/${project.id}`} className="block">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition cursor-pointer flex flex-col h-full">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">{project.name}</h3>
                  <span className="inline-flex items-center rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700">
                    {project.members.length} members
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-500 flex-grow line-clamp-3">{project.description || 'No description provided.'}</p>
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="text-xs text-gray-400">Created: {new Date(project.created_at).toLocaleDateString()}</div>
                  <div className="text-sm font-medium text-primary-600">View Board &rarr;</div>
                </div>
              </div>
            </Link>
          ))}
          {projects.length === 0 && (
            <div className="col-span-full bg-white rounded-2xl p-12 text-center border border-dashed border-gray-300">
              <h3 className="text-lg font-medium text-gray-900">No projects found</h3>
              <p className="mt-1 text-sm text-gray-500">You are not assigned to any projects yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
