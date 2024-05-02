"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSocket } from "@/hooks/useSocket";

export default function Home() {
  const router = useRouter();
  const [serverLoaded, setServerLoaded] = useState(false);

  const handleClick = () => {
    if (serverLoaded) {
      router.push("/playground");
    } else {
      alert("Server not loaded yet, please wait a few seconds and try again.");
    }
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://pgserver.onrender.com/");
      if (response.ok) {
        setServerLoaded(true);
        console.log("response ok");
      }
    }
    fetchData();
  }, []);
  return (
    <>
      <div className="p-12 w-full h-screen flex bg-black justify-center space-y-6 flex-col items-center">
        <h1 className="text-4xl text-purple-600">Codedamn Playground</h1>
        <button
          onClick={() => handleClick()}
          className="block px-4 py-2 rounded-full bg-transparent text-purple-300 ring-1 ring-purple-400"
        >
          Start Playground
        </button>
      </div>
    </>
  );
}
