"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Starfield from "react-starfield";



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
      toast.success("Signup Successfully!", {
        style: {
          border: "2px solid #41eb53",
        },
        duration: 4000,
      });
      router.push("/login")

    } catch (error: any) {
      console.log("Signup failed!", error.message);
      toast.error("Oops! Signup failed!!", {
        style: {
          border: "2px solid #e92237",
        },
        duration: 3000,
      });
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

  // tailspin loading icon

    return (
      <div className="App">
        <Starfield
          starCount={1000}
          starColor={[255, 255, 255]}
          speedFactor={0.05}
          backgroundColor="black"
        />
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <h1 className="text-3xl mb-4 font-bold uppercase bg-gradient-to-r from-purple-900 to-purple-500 bg-clip-text text-transparent">
            {loading ? "processing" : "Signup"}
          </h1>
          <hr />
          <label htmlFor="username"> username</label>
          <input
            className="p-1 bg-transparent text-gray-400 border rounded-lg mb-4 shadow-md focus:shadow-gray-400 focus:outline-none  focus:border-gray-400"
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="username"
          />

          <label htmlFor="email"> email</label>
          <input
            className="p-1 bg-transparent text-gray-400 border rounded-lg mb-4 shadow-md focus:shadow-gray-400 focus:outline-none  focus:border-gray-400"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="email"
          />

          <label htmlFor="password"> password</label>
          <input
            className="p-1 bg-transparent text-gray-400 border rounded-lg mb-4 shadow-md focus:shadow-gray-400 focus:outline-none  focus:border-gray-400"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="password"
          />

          <button
            onClick={onSignup}
            className="px-5 py-2.5 m-2 flex hover:space-x-large text-center items-center justify-center font-bold uppercase border bg-transparent rounded-lg mb-4 focus:outline-none text-purple-700 hover:text-white border-purple-700 hover:bg-purple-700 hover:shadow-2xl hover:shadow-purple-700 transition-all focus:opacity-[0.85] active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-clipboard2-check-fill"
              viewBox="0 0 16 16"
            >
              <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5" />
              <path d="M4.085 1H3.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1h-.585q.084.236.085.5V2a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 2v-.5q.001-.264.085-.5m6.769 6.854-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708.708" />
            </svg>
            {buttonDisabled ? "No Signup" : "Signup"}
          </button>
          <Link className="text-purple-500 hover:underline" href="/login">
            Already a user? Login
          </Link>
          <Toaster position="top-right" reverseOrder={false} />
        </div>
      </div>
    );
}