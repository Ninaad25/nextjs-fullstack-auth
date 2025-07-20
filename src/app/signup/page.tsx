"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";


export default function SignupPage(){
  const router = useRouter()
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: ""
  }) 

  const [buttonDisabled, setButtonDisabled] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const onSignup = async () => {
    try {
      setLoading(true)
      const response = await axios.post("/api/users/signup", user)
      console.log("Signup success!", response.data);
      toast.success("Signup Successfully!");
      router.push("/login")

    } catch (error: any) {
      console.log("Signup failed!", error.message);
      toast.error(error.message);
    } finally {

    }
  }

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0 && 
      user.username.length > 0) {
      setButtonDisabled(false);
    }
    else {
      setButtonDisabled(true)
    }
  }, [user])

    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-3xl">{loading ? "processing" : "Signup"}</h1>
        <hr />
        <label htmlFor="username"> username</label>
        <input
          className="p-1 bg-white text-gray-900 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-600"
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="username"
        />

        <label htmlFor="email"> email</label>
        <input
          className="p-1 bg-white text-gray-900 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-600"
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
        />

        <label htmlFor="password"> password</label>
        <input
          className="p-1 bg-white text-gray-900 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-600"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
        />

        <button
          onClick={onSignup}
          className="p-2 border bg-transparent border-gray-400 rounded-lg mb-4 focus:outline-none text-white hover:text-black focus:border-blue-600 hover:bg-blue-300"
        >
          {buttonDisabled ? "No Signup" : "Signup"}
        </button>
        <Link href="/login">Visit Login Page</Link>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    );
}