"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { set } from "mongoose";

export default function SignupPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/user/signup", user);
      console.log("Signup Successfully", response.data);
      toast.success(response.data.message);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup error", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl text-center">
        {loading ? "processing" : "Signup"}
      </h1>
      <label htmlFor="username">Username: </label>
      <input
        className="border border-gray-300 rounded-md p-1 text-black"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="Username"
      />
      <label htmlFor="email">Email: </label>
      <input
        className="border border-gray-300 rounded-md p-1 text-black "
        id="email"
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
      />
      <label htmlFor="password">Password: </label>
      <input
        className="border border-gray-300 rounded-md p-1 text-black "
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Password"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-md"
        onClick={onSignup}
      >
        {buttonDisabled ? "No Signup" : "Signup"}
      </button>
      <Link href="/login">Visit the login page</Link>
    </div>
  );
}
