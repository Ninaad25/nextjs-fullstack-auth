"use client"; 

/*
Enables the use of client-side features like hooks (useState, useEffect), event handlers, and direct DOM manipulation.
Allows for optimized loading by sending only necessary client-side JavaScript to the browser, reducing the initial bundle size.
*/
import Link from "next/link";
import { GeistSans } from "geist/font/sans";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // It provides access to the router object, allowing for programmatic `navigation` and interaction with the application's routing state.
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";


//`useState` accepts an initial state and returns two values: The `current state` & `function that updates the state`.
// spread operator `(...)` allows us to quickly copy all or part of an existing array or object into another array or object.
export default function LoginPage() {
  const router = useRouter()
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const onLogin = async () => {
    try {
      setLoading(true)
     const response = await axios.post("/api/users/login", user)
      console.log("Login successful!",response.data);
      toast.success("Login successful!");
      router.push("/profile")
      
    } catch (error: any) {
      console.log("Login failed!", error.message);
      toast.error(error.message)
    }finally {
      setLoading(false)
    }
  }; 

  useEffect(() => {
    if (
      user.email.length > 0 && user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  },[user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl">{loading? "processing" : "Login"}</h1>
      <hr />
      <label htmlFor="email"> email:</label>
      <input
        className="p-1 bg-white text-gray-900 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-600"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />

      <label htmlFor="password"> password:</label>
      <input
        className="p-1 bg-white text-gray-900 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-600"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        onClick={onLogin}
        className="p-2 border bg-transparent border-gray-400 rounded-lg mb-4 focus:outline-none text-white hover:text-black focus:border-blue-600 hover:bg-blue-300"
      >
        {buttonDisabled ? "No Login" : "Login"}
      </button>
      <Link href="/signup">Visit Signup Page</Link>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
