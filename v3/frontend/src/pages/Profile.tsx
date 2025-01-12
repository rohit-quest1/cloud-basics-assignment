import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import axios from "axios";
import Navbar from "../components/Navbar";
import { TextInput, Button, DialogPanel } from '@tremor/react';

interface UserData {
  username: string;
  email: string;
}

export default function Profile() {
  const [userData, setUserData] = useState<UserData>({ username: '', email: '' });
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  const userId = useSelector((state: any) => state.auth.user.id);
  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${apiUrl}/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserData({
        username: response.data.username,
        email: response.data.email
      });
    } catch (error) {
      setError('Failed to fetch user data');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const updateData: any = { ...userData };
      if (password) {
        updateData.password = password;
      }

      await axios.put(
        `${apiUrl}/api/users/${userId}`,
        updateData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setMessage('Profile updated successfully!');
      setPassword(''); // Clear password field after successful update
    } catch (error) {
      setError('Failed to update profile');
    }
  };

  return (
    <div  className="min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-1 h-[calc(100vh-6rem)] p-4">
      <div className="max-w-md w-full">
      <h3 className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong mb-4">
        Profile Settings
      </h3>
        
        {message && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{message}</div>}
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="mt-8">
          <div className="grid gap-y-6">
            <div className="flex flex-col">
              <label
                htmlFor="username"
                className="text-left text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Username
              </label>
              <TextInput
                id="username"
                type="text"
                value={userData.username}
                onChange={(e) => setUserData({...userData, username: e.target.value})}
                className="mt-2"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-left text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Email
              </label>
              <TextInput
                id="email"
                type="email"
                value={userData.email}
                onChange={(e) => setUserData({...userData, email: e.target.value})}
                className="mt-2"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="text-left text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                New Password (leave blank to keep current)
              </label>
              <TextInput
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2"
              />
            </div>

            <Button
              type="submit"
              className="whitespace-nowrap rounded-tremor-default  px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input border-none bg-[#F8AD6A] hover:bg-[#F2360A] dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis"
            >
              Update Profile
            </Button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
} 