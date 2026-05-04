import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 shadow-xl rounded-2xl border border-gray-100">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold tracking-tight text-gray-900">
            Sign in to TaskManager
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <input
                type="email"
                required
                className="relative block w-full appearance-none rounded-lg border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                required
                className="relative block w-full appearance-none rounded-lg border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-lg border border-transparent bg-primary-600 px-4 py-3 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200"
            >
              Sign in
            </button>
          </div>
          
          <div className="text-center mt-4">
            <span className="text-sm text-gray-600">Don't have an account? </span>
            <Link to="/register" className="text-sm font-medium text-primary-600 hover:text-primary-500">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
