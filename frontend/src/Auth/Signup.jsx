// SignupForm.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const Signup = () => {
  const [role, setRole] = useState('user');
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });
  const { signup, isSigningUp } = useAuthStore();
  const validateForm = () => {
    if (!formData.firstName.trim()) return toast.error("first name is required");
    if (!formData.lastName.trim()) return toast.error("last name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    // if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) signup(formData);
  };
  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setFormData({ ...formData, role: e.target.value });
  };
//  console.log(formData)
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      
      <form onSubmit={handleSubmit} className=" mt-4 mb-4 bg-white shadow-lg rounded-lg p-8 w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center text-purple-700">Sign Up</h2>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">First Name</span>
          </label>
          <input
            type="text"
            placeholder="Enter your first name"
            className="input input-bordered w-full"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          />
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Last Name</span>
          </label>
          <input
            type="text"
            placeholder="Enter your last name"
            className="input input-bordered w-full"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          />
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="input input-bordered w-full"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>

        {/* Radio buttons for User/Admin selection */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Sign up as</span>
          </label>
          <div className="flex gap-4">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="role"
                value="user"
                className="radio checked:bg-purple-700"
                checked={role === 'user'}
                onChange={handleRoleChange}
                // onChange={(e) => setFormData({ ...formData, role: e.target.value })}

              />
              <span className="ml-2">User</span>
            </label>

            <label className="label cursor-pointer">
              <input
                type="radio"
                name="role"
                value="admin"
                className="radio checked:bg-purple-700"
                checked={role === 'admin'}
                onChange={handleRoleChange}
                // onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              />
              <span className="ml-2">Admin</span>
            </label>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}>
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-700 font-medium hover:underline">
            Log in here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
