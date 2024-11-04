"use client";
import jwt, { JwtPayload } from "jsonwebtoken";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/admin-dashboard/LoginPage";

type DecodedToken = JwtPayload & {
  exp?: number;
};

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded: DecodedToken | null = jwt.decode(token) as DecodedToken;

    if (!decoded || !decoded.exp) {
      console.error("Invalid token format or missing 'exp' claim");
      return true;
    }

    const currentTime = Math.floor(Date.now() / 1000);

    return decoded.exp < currentTime;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};

export default function LoginPage() {
  const router = useRouter();
  const authToken =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (authToken && !isTokenExpired(authToken)) {
      router.push("/admin/dashboard");
    }
  }, [authToken, router]);

  return (
    <div>
      <LoginForm />
    </div>
  );
}
