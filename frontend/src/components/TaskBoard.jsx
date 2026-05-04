import React from 'react';

const TaskCard = ({ task, onStatusChange }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-3 cursor-grab hover:shadow-md transition">
      <div className="flex justify-between items-start mb-2">
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </span>
        <select 
          className="text-xs bg-gray-50 border-gray-200 rounded p-1 text-gray-600 outline-none"
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value)}
        >
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <h4 className="font-semibold text-gray-800 text-sm mb-1">{task.title}</h4>
      <p className="text-xs text-gray-500 line-clamp-2 mb-3">{task.description}</p>
      
      <div className="flex justify-between items-center text-xs text-gray-400 border-t border-gray-100 pt-3 mt-1">
        <div className="flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No date'}
        </div>
        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold" title={task.assigned_to_details?.email || 'Unassigned'}>
          {task.assigned_to_details ? task.assigned_to_details.email[0].toUpperCase() : '?'}
        </div>
      </div>
    </div>
  );
};

const TaskBoard = ({ tasks, onStatusChange, isAdmin }) => {
  const columns = [
    { id: 'Todo', title: 'To Do', color: 'bg-gray-100' },
    { id: 'In Progress', title: 'In Progress', color: 'bg-blue-50' },
    { id: 'Completed', title: 'Completed', color: 'bg-green-50' }
  ];

  return (
    <div className="flex space-x-6 h-full items-start">
      {columns.map(col => (
        <div key={col.id} className={`flex-shrink-0 w-80 rounded-2xl p-4 ${col.color} border border-black border-opacity-5`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700">{col.title}</h3>
            <span className="bg-white text-gray-600 text-xs font-bold px-2 py-1 rounded-full shadow-sm">
              {tasks.filter(t => t.status === col.id).length}
            </span>
          </div>
          
          <div className="min-h-[500px]">
            {tasks.filter(t => t.status === col.id).map(task => (
              <TaskCard key={task.id} task={task} onStatusChange={onStatusChange} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskBoard;
