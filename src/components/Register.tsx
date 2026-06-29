import { useState } from "react";

type RegisterProps = {
  onBack: () => void;
};

export default function Register({ onBack }: RegisterProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
  e.preventDefault();

  const user = {
    name,
    email,
    password,
  };

  localStorage.setItem("vhgUser", JSON.stringify(user));

  alert("Registration Successful!");

  onBack();
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Register
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full border p-2 mb-4 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-4 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-4 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded"
        >
          Register
        </button>

        <button
          type="button"
          onClick={onBack}
          className="w-full mt-3 bg-gray-500 text-white p-2 rounded"
        >
          Back to Login
        </button>
      </form>
    </div>
  );
}