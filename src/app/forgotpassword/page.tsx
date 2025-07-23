"use client";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import Starfield from "react-starfield";
import toast, { Toaster } from "react-hot-toast";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [emailSent, setEmailSent] = useState(false)

    const onSubmit = async () => {
        try {
            setLoading(true)
            const response = await axios.post('/api/users/forgotpassword', {email})
            console.log("Forgot password success", response.data);
            toast.success("Reset password link sent to your email!", {
              style: {
                border: "2px solid #41eb53",
              },
              duration: 4000,
            });
            setEmailSent(true)
            
        } catch (error: any) {
            console.log("Forgot password failed", error.response?.data);
            toast.error(error.response?.data?.error || "Something went wrong!")
        } finally {
            setLoading(false)
        }
    }

    return (
      <div className="App">
        <Starfield
          starCount={2000}
          starColor={[255, 255, 255]}
          speedFactor={0.09}
          backgroundColor="black"
        />

        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <h1 className="text-4xl font-bold uppercase mb-4 bg-gradient-to-r from-purple-900 to-purple-500 bg-clip-text text-transparent">
            Forgot Password
          </h1>

          {!emailSent ? (
            <>
              <label htmlFor="email">Email</label>
              <input
                className="p-2 border shadow-md  text-gray-400 border-gray-300  rounded-lg mb-4 focus:shadow-gray-400 focus:outline-none  focus:border-gray-400  w-50 h-10"
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />

              <button
                onClick={onSubmit}
                disabled={loading}
                className="p-2 w-40 border bg-transparent shadow-lg hover:shadow-purple-500 hover:bg-purple-700 border-purple-600 rounded-lg mb-4 focus:outline-none focus:border-purple-800"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>

              <Link href="/login" className="text-purple-500 hover:underline">
                Back to Login
              </Link>
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl border border-green-600 mb-4  text-green-600">
                Reset Link Sent!
              </h2>
              <p className="mb-4">
                Please check your email for the password reset link.
              </p>
              <Link href="/login" className="text-purple-500 hover:underline">
                Back to Login
              </Link>
            </div>
          )}
          <Toaster position="top-right" reverseOrder={false} />
        </div>
      </div>
    );
}