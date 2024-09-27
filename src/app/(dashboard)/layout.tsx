"use client"; // Correct directive

import { useEffect, useState } from "react";
import Menu from "../../components/Menu";
import Navbar from "../../components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    // Clear localStorage when the component mounts
    // localStorage.clear();
    // console.log("Local storage cleared");
    const userObject = {
      username: "abc",
      role: "student", // or whatever role you want to assign
      accessToken: "yourAccessTokenHere",
      studentId: "yourStudentIdHere",
    };

    // Store the object as a JSON string
    localStorage.setItem("token", JSON.stringify(userObject));
    const token = localStorage.getItem("token");
    setUser(JSON.parse(token));
    console.log(JSON.parse(token));

    // Check if token exists
    if (!localStorage.getItem("token")) {
      alert("Please Login");
      // window.location.href = "https://www.google.com";
    }
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <div className="h-screen flex">
      {/* LEFT */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4">
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start gap-2"
        >
          <Image src="/logo.png" alt="logo" width={32} height={32} />
          <span className="hidden lg:block font-bold">Campus Board</span>
        </Link>
        <Menu user={user} />
      </div>
      {/* RIGHT */}

      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll flex flex-col">
        <Navbar user={user} />
        {children}
      </div>
    </div>
  );
}
