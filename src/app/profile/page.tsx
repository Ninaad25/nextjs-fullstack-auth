"use client";
import Link from "next/link";
import React, {useState} from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";



export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing")
  const onLogout = async () => {
    try {
       await axios.get("/api/users/logout")
       toast.success("Successfully logged out!")
       router.push("/login");
    } catch (error: any) {
        console.log(error.message);
        toast.error("Oops! Failed to logout!!")
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me")
    console.log(res.data);
    setData(res.data.data._id)
  }

  return (
    <div className="flex flex-col items-center justify-center py-2 min-h-screen">
      <h1 className=" mb-2">Profile </h1>
      <hr />
      <p className=" mb-2">Profile page</p>
      <h2 className="p-1 mb-2 w-20 text-center shadow-2xl hover:shadow-purple-700 hover:shadow-2xl rounded bg-purple-500 text-black hover:text-white hover:bg-purple-700">
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button
        onClick={onLogout}
        className="px-5 py-2.5 m-5 flex hover:space-x-large text-center items-center justify-center font-bold uppercase border bg-transparent rounded-lg mb-4 focus:outline-none text-purple-700 hover:text-white border-purple-700 hover:bg-purple-700 hover:shadow-2xl hover:shadow-purple-700 transition-all focus:opacity-[0.85] active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-box-arrow-right"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
          />
          <path
            fillRule="evenodd"
            d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
          />
        </svg>
        Logout
      </button>
      <button
        onClick={getUserDetails}
        className="w-40 h-12 m-4 text-violet-500 hover:text-white bg-transparent cursor-pointer rounded-lg border-2 border-[#9748FF] shadow-[inset_0px_-2px_0px_1px_#9748FF] group hover:bg-[#9748FF] transition duration-300 ease-in-out"
      >
        <span className="font-medium text-[#333] group-hover:text-white" />
        Get User Details
      </button>
    </div>
  );
}
