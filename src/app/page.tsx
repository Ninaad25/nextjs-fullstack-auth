import Image from "next/image";
import Starfield from "react-starfield";
import React from "react";
import Link from "next/link";


export default function Home() {
  return (
    <div className="App">
      <Starfield
        starCount={2000}
        starColor={[255, 255, 255]}
        speedFactor={0.09}
        backgroundColor="black"
      />
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-10 gap-10 sm:p-20">
        <h1 className="text-6xl mt-30 font-serif font-bold uppercase   bg-gradient-to-r from-purple-900 to-purple-500 bg-clip-text text-transparent text-shadow-lg/30 text-shadow-gray-800 drop-shadow-xl/50 shadow-lg shadow-purple-700">
          NextJS Fullstack Auth
        </h1>
        <p className="text-lg text-gray-300 text-center max-w-2xl first-letter:text-5xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-100 first-letter:me-3 first-letter:float-start">
          This application leverages a monolithic 'Next.js' architecture with
          integrated frontend and backend components to deliver secure and
          streamlined user experiences. Core authentication features include{" "}
          <strong className="font-semibold text-gray-900 dark:text-purple-500">
            account registration, user login, protected route access, secure
            password reset via email, and email address verification.
          </strong>{" "}
          The authentication system utilizes encrypted password storage and
          robust session management to safeguard user data. Email-based
          workflows for verification and password recovery are implemented using
          industry-standard practices and are tested via{" "}
          <strong className="font-semibold text-gray-900 dark:text-purple-500">
            Mailtrap
          </strong>{" "}
          to ensure reliability prior to production deployment.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-0 sm:mt-10 items-center">
          <Link
            href="/login"
            className="p-2 w-40 border bg-transparent text-center shadow-lg hover:shadow-purple-500 border-purple-600 rounded-lg focus:outline-none focus:border-purple-800 text-white"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
