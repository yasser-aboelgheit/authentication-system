import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "../components/ui/alert";
import { BASE_URL } from "../shared/constant";

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", name: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message);
        return;
      }

      navigate("/app");
    } catch {
      setError("Failed to sign up. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-3xl font-bold text-center">Create Account</h2>

        {error && <Alert variant="error">{error}</Alert>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            required
            placeholder="Email"
            className="w-full border p-2 rounded-md"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />

          <input
            type="text"
            required
            placeholder="Name"
            className="w-full border p-2 rounded-md"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <input
            type="password"
            required
            placeholder="Password"
            className="w-full border p-2 rounded-md"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">
            Sign Up
          </button>

          <button type="button" onClick={() => navigate("/")} className="text-sm text-blue-600">
            Already have an account? Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
