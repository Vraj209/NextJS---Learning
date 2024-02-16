"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { set } from "mongoose";
import toast from "react-hot-toast";

export default function SigninPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/user/signin", user);
      console.log("Login Successfully", response.data);
      toast.success("Login Successfully");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login error", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl text-center">
        {loading ? "processing" : "Login"}
      </h1>

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
        className="border border-gray-300 rounded-md p-1 text-black"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Password"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-md"
        onClick={onSignin}
      >
        {buttonDisabled ? "No Login" : "Login"}
      </button>
      <Link href="/signup">Visit the register page</Link>
    </div>
  );
}
