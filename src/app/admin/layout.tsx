"use client";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const authToken = localStorage.getItem("token") || "";

  const isTokenExpired = (token: string): boolean => {
    try {
      const decoded: any = jwt.decode(token);

      if (!decoded || !decoded.exp) {
        console.error("Invalid token format or missing 'exp' claim");
        return true; // Consider invalid tokens as expired
      }

      const currentTime = Math.floor(Date.now() / 1000);

      if (decoded.exp < currentTime) {
        console.log("Token has expired");
        return true; // Token is expired
      } else {
        console.log("Token is still valid");
        return false; // Token is valid
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      return true; // Consider an error in decoding as an expired token
    }
  };

  useEffect(() => {
    if (!authToken || isTokenExpired(authToken)) {
      router.push("/admin/login");
    }
  }, [authToken, router]);

  return <>{children}</>;
}
