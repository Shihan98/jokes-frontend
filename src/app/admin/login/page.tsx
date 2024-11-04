"use client";
import jwt from "jsonwebtoken";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/admin-dashboard/LoginPage";

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded: any = jwt.decode(token);

    if (!decoded || !decoded.exp) {
      console.error("Invalid token format or missing 'exp' claim");
      return true; // Consider invalid tokens as expired
    }

    const currentTime = Math.floor(Date.now() / 1000);

    return decoded.exp < currentTime; // Return true if expired, false if valid
  } catch (error) {
    console.error("Error decoding token:", error);
    return true; // Consider an error in decoding as an expired token
  }
};

export default function LoginPage() {
  const router = useRouter();
  const authToken =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (authToken && !isTokenExpired(authToken)) {
      // If token is valid, redirect to a protected page (e.g., dashboard)
      router.push("/admin/dashboard");
    }
  }, [authToken, router]);

  return (
    <div>
      <LoginForm />
    </div>
  );
}
