"use client"; 

/*
Enables the use of client-side features like hooks (useState, useEffect), event handlers, and direct DOM manipulation.
Allows for optimized loading by sending only necessary client-side JavaScript to the browser, reducing the initial bundle size.
// It provides access to the router object, allowing for programmatic `navigation` and interaction with the application's routing state.
*/
import Link from "next/link";
import Starfield from "react-starfield";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 
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
      toast.success("Login successful!", {
        style: {
          border: "2px solid #41eb53",
        },
        duration: 4000,
      });
      router.push("/profile")
      
    } catch (error: any) {
      console.log("Login failed!", error.message);
      toast.error("Login failed!", {
        style: {
          border: "2px solid #e92237",
        },
        duration: 3000,
      });
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
    <div className="App">
      <Starfield
        starCount={1000}
        starColor={[255, 255, 255]}
        speedFactor={0.05}
        backgroundColor="black"
      />
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl font-bold uppercase bg-gradient-to-r from-purple-900 to-purple-500 bg-clip-text text-transparent">
          {loading ? "processing" : "Login"}
        </h1>
        <hr />
        <label htmlFor="email"> email:</label>
        <input
          className="p-1 bg-transparent shadow-md  text-gray-400 border rounded-lg mb-4 focus:shadow-gray-400 focus:outline-none  focus:border-gray-400"
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
        />

        <label htmlFor="password"> password:</label>
        <input
          className="p-1 bg-transparent shadow-md  text-gray-400 border rounded-lg mb-6 focus:shadow-gray-400 focus:outline-none  focus:border-gray-400"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
        />
        <button
          onClick={onLogin}
          className=" px-5 py-2.5 flex hover:space-x-large  text-center items-center justify-center font-bold uppercase border bg-transparent rounded-lg mb-4 focus:outline-none text-purple-700 hover:text-white border-purple-700 hover:bg-purple-700 hover:shadow-2xl hover:shadow-purple-700 transition-all focus:opacity-[0.85] active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none focus:ring-1 focus:ring-purple-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-right-square-fill"
            viewBox="3 0 16 16"
          >
            <path d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1" />
          </svg>
          {buttonDisabled ? "No Login" : "Login"}
        </button>
        <div className="flex flex-col justify-items-center">
          <Link className="text-purple-500 mb-2 hover:underline" href="/signup">
            Visit Signup Page
          </Link>
          <Link
            href="/forgotpassword"
            className="text-purple-500 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </div>
  );
}
