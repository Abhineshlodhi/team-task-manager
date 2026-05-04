import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import TaskBoard from '../components/TaskBoard';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchProjectData = async () => {
    try {
      const [projectRes, tasksRes] = await Promise.all([
        api.get(`/projects/${id}/`),
        api.get('/tasks/') // Filtering should happen, but for simplicity we filter client side or API needs custom endpoint. Let's assume API filters by user's assigned/managed tasks and we filter by project ID here.
      ]);
      setProject(projectRes.data);
      setTasks(tasksRes.data.filter(t => t.project === parseInt(id)));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProjectData();
  }, [id]);

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await api.patch(`/tasks/${taskId}/`, { status: newStatus });
      fetchProjectData(); // refresh tasks
    } catch (err) {
      console.error('Failed to update task status');
    }
  };

  if (!project) return <div className="p-8 text-center">Loading project details...</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 py-4 px-8 flex justify-between items-center">
        <div>
          <div className="flex items-center space-x-2">
            <Link to="/projects" className="text-gray-400 hover:text-gray-600 transition">&larr; Projects</Link>
            <span className="text-gray-300">/</span>
            <h1 className="text-xl font-bold text-gray-900">{project.name}</h1>
          </div>
          <p className="text-sm text-gray-500 mt-1">{project.description}</p>
        </div>
        <div className="flex -space-x-2 overflow-hidden">
          {project.members.map(member => (
            <div key={member.id} className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-primary-100 flex items-center justify-center text-xs font-bold text-primary-700" title={member.user_details.email}>
              {member.user_details.first_name ? member.user_details.first_name[0] : member.user_details.email[0].toUpperCase()}
            </div>
          ))}
        </div>
      </header>

      <main className="flex-1 overflow-x-auto p-8">
        <TaskBoard tasks={tasks} onStatusChange={handleStatusChange} isAdmin={user?.role === 'Admin'} />
      </main>
    </div>
  );
};

export default ProjectDetail;
