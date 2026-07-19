import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";

const ForgotPasswordModal = ({ open, onClose }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    setLoading(true);
    // Simulate API reset password request
    setTimeout(() => {
      setLoading(false);
      toast.success("Password reset link sent to your email!");
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-2xl transition-all duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
        >
          <IoClose className="text-xl" />
        </button>

        {/* Heading */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-(--color-neutral)">
            Forgot Password
          </h3>
          <p className="text-sm text-(--color-secondary) mt-1">
            Enter your email to receive a password reset link.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-(--color-neutral) mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-3 py-2.5 border border-(--color-base-300) rounded-lg text-sm text-(--color-neutral) placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-(--color-primary) focus:border-transparent transition-all"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-(--color-primary) text-white font-semibold rounded-lg hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending link..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
