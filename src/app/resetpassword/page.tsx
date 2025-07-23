"use client";
import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import Starfield from "react-starfield";

function ResetPasswordContent() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [tokenValid, setTokenValid] = useState(false);
  const [verifyingToken, setVerifyingToken] = useState(true);
  const [passwordReset, setPasswordReset] = useState(false);

  const searchParams = useSearchParams();
  const encodedToken = searchParams.get("token");
  const token = encodedToken ? decodeURIComponent(encodedToken) : null;

  useEffect(() => {
    const verifyToken = async () => {
      if (!encodedToken) {
        toast.error("Oops! Invalid reset link!!",{
        style: {
          border: "2px solid #e92237",
        },
        duration: 3000,
      });
        setVerifyingToken(false);
        return;
      }

      try {
        // Decode the URL-encoded token
        const token = decodeURIComponent(encodedToken);

        const response = await axios.post("/api/users/verifyresettoken", {
          token,
        });
        if (response.data.success) {
          setTokenValid(true);
        } else {
          toast.error("Invalid or expired reset link", {
            style: {
              border: "2px solid #e92237",
            },
            duration: 3000,
          });
        }
      } catch (error: any) {
        console.error("Token verification error:", error);
        toast.error("Invalid or expired reset link", {
          style: {
            border: "2px solid #e92237",
          },
          duration: 3000,
        });
      } finally {
        setVerifyingToken(false);
      }
    };

    verifyToken();
  }, [encodedToken]);

  const onSubmit = async () => {
    try {
      setLoading(true);

      if (!password || !confirmPassword) {
        toast.error("Please fill in all fields", {
          style: {
            border: "2px solid #e92237",
          },
          duration: 3000,
        });
        return;
      }

      if (password !== confirmPassword) {
        toast.error("Passwords do not match", {
          style: {
            border: "2px solid #e92237",
          },
          duration: 3000,
        });
        return;
      }

      if (password.length < 6) {
        toast.error("Password must be at least 6 characters", {
          style: {
            border: "2px solid #e92237",
          },
          duration: 3000,
        });
        return;
      }

      const response = await axios.post("/api/users/resetpassword", {
        token,
        password,
      });

      if (response.data.success) {
        toast.success("Password reset successfully!", {
          style: {
            border: "2px solid #41eb53",
          },
          duration: 4000,
        });
        setPasswordReset(true);
      }
    } catch (error: any) {
      console.error("Reset password error:", error);
      toast.error(error.response?.data?.error || "Failed to reset password!");
    } finally {
      setLoading(false);
    }
  };

  if (verifyingToken) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl mb-4">Verifying Reset Link...</h1>
      </div>
    );
  }

  if (!tokenValid) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl mb-6 border border-red-500 text-red-500">Invalid Reset Link</h1>
        <p className="mb-2 font-bold text-lg">The reset link is invalid or has expired.</p>
        <Link href="/forgotpassword" className="text-purple-500 hover:underline">
          Request New Reset Link
        </Link>
      </div>
    );
  }

  return (
    <div className="App">
      <Starfield
        starCount={1000}
        starColor={[255, 255, 255]}
        speedFactor={0.05}
        backgroundColor="black"
      />
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl mb-4">Reset Password</h1>

      {!passwordReset ? (
        <>
          <label htmlFor="password">New Password</label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-400 text-gray-400"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
          />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-400 text-gray-400"
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
          />

          <button
            onClick={onSubmit}
            disabled={loading}
            className="p-2 border m-3 border-purple-600 rounded-lg mb-4 focus:outline-none bg-transparent hover:bg-purple-800 focus:border-purple-600"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>

          <Link href="/login" className="text-purple-500 hover:underline">
            Back to Login
          </Link>
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl mb-4 border border-green-500 text-green-500">
            Password Reset Successfully!
          </h2>
          <p className="mb-4 text-lg font-bold">You can now log in with your new password.</p>
          <Link href="/login" className="text-purple-500 hover:underline">
            Go to Login
          </Link>
        </div>
      )}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl mb-4">Loading...</h1>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}
