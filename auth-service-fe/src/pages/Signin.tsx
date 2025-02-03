import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "../components/ui/alert";
import { BASE_URL } from "../shared/constant";

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/auth/signin`, {
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
      setError("Failed to sign in. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow">
        <h2 className="text-3xl font-bold text-center">Sign In</h2>

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
            type="password"
            required
            placeholder="Password"
            className="w-full border p-2 rounded-md"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">
            Sign In
          </button>

          <button type="button" onClick={() => navigate("/signup")} className="text-sm text-blue-600">
            Need an account? Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
