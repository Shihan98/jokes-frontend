"use client";
import jwt, { JwtPayload } from "jsonwebtoken";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type DecodedToken = JwtPayload & {
  exp?: number;
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();

  const authToken =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const isTokenExpired = (token: string): boolean => {
    try {
      const decoded: DecodedToken | null = jwt.decode(token) as DecodedToken;

      if (!decoded || !decoded.exp) {
        console.error("Invalid token format");
        return true;
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
      return true;
    }
  };

  useEffect(() => {
    if (!authToken || isTokenExpired(authToken)) {
      router.push("/admin/login");
    }
  }, [authToken, router]);

  return <>{children}</>;
}
