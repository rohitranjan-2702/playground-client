"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useSocket } from "@/hooks/useSocket";

export default function Home() {
  const router = useRouter();
  const socket = useSocket("pgId");
  return (
    <>
      <div className="p-12 w-full h-screen flex bg-black justify-center space-y-6 flex-col items-center">
        <h1 className="text-4xl text-purple-600">Codedamn Playground</h1>
        <button
          onClick={() => router.push("/playground")}
          className="block px-4 py-2 rounded-full bg-transparent text-purple-300 ring-1 ring-purple-400">
          Start Playground
        </button>
      </div>
    </>
  );
}
