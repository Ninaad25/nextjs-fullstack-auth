"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { setServers } from "dns";

export default function verifyEmialPage() {
    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/users/verifyemail", {token})
            setVerified(true)
        } catch (error:any) {
            setError(true)
            console.log(error.response.data);
            
        }
    }

    useEffect(() => {
      const urlToken = window.location.search.split("=")[1];
      setToken(urlToken || "")
      
    }, [])
    
    useEffect(() =>{
        if (token.length> 0) {
            verifyUserEmail()
        }
    },[token])

    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl mb-4">Verify your email</h1>
        <h2 className="p-2  bg-purple-500 hover:bg-purple-600 rounded-lg text-black">
          {token ? `${token}` : "No token"}
        </h2>

        {verified && (
          <div >
            <h2 className="text-2xl mb-2">Email Verified</h2>
            <Link 
            className="mb-2"
            href="/login">
              Login
            </Link>
          </div>
        )}
        {error && (
          <div>
            <h2 className="text-2xl rounded-lg bg-red-600 text-black">Error!!</h2>
            
          </div>
        )}
      </div>
    );
}