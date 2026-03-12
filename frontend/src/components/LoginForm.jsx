import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const LoginForm = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const endpoint = isLogin ? "/api/login" : "/api/register";

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Something went wrong");
        return;
      }

      if (isLogin) {
        localStorage.setItem("token", data.token);
        onLogin(data.token);
      } else {
        setIsLogin(true);
        setError("");
        alert("Account created! Please log in.");
      }
    } catch (err) {
      setError("Could not connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-4 md:mx-auto mt-10 bg-gray-100 border-1 border-solid p-4 shadow-lg max-w-md relative">
      <div className="absolute top-2 left-2 w-full h-full bg-black -z-10"></div>

      <h2 className="font-semibold mb-4">
        {isLogin ? "Log in to post thoughts" : "Create an account"}
      </h2>

      <form onSubmit={handleSubmit}>
        <label className="block text-gray-600 font-semibold mb-1 text-sm">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="your@email.com"
          className="w-full p-2 border focus:outline-none focus:ring-1 mb-3"
        />

        <label className="block text-gray-600 font-semibold mb-1 text-sm">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="••••••••"
          className="w-full p-2 border focus:outline-none focus:ring-1 mb-3"
        />

        {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-1 bg-red-200 text-black font-semibold py-3 px-4 rounded-full flex items-center justify-center gap-2 hover:bg-red-300 hover:text-white transition-colors w-full"
        >
          {loading ? "Loading..." : isLogin ? (
            <>
              <img src="./heart.png" alt="heart" className="w-4" />
              Log in
              <img src="./heart.png" alt="heart" className="w-4" />
            </>
          ) : "Create account"}
        </button>
      </form>

      <p className="text-center mt-3 text-sm text-gray-600">
        {isLogin ? "No account? " : "Already have an account? "}
        <button
          onClick={() => { setIsLogin(!isLogin); setError(""); }}
          className="text-[#ff7a63ff] underline hover:text-red-900"
        >
          {isLogin ? "Register here" : "Log in here"}
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
