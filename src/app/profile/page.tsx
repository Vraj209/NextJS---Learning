"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import axios from "axios";

export default function ProfilePage() {

  const [loading, setLoading] = useState(false)
  const router = useRouter();
  const logoutUser = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/user/logout");
      console.log("Logout Successfully", response.data);
      router.push("/blankpage");

    } catch (error:any) {
      return NextResponse.json({error: error.message},{status: 500})
    } finally {
      setLoading(false);
    
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>Welcome to the profile page</h1>
      <div>
        <h1 className="text-3xl text-center">
          {loading ? "processing" : "Logout Here"}
        </h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={logoutUser}
        >Logout</button>
      </div>
    </div>

  );
}
