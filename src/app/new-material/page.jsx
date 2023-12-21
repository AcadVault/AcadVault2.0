"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function NewMaterialPage() {
  const session = useSession();
  if (session.status === "loading") return "Loading...";
  if (session.status === "unauthenticated") redirect("/login");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/material", e.target);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <form
        className="flex flex-col w-full items-start"
        onSubmit={handleSubmit}
      >
        <input type="text" name="courseName" required />
        <input type="file" name="file" />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          type="submit"
        >
          Save
        </button>
      </form>
    </div>
  );
}
