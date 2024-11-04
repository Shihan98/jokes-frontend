"use client";
import React, { useState, useEffect } from "react";
import Dashboard from "@/components/admin-dashboard";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  return (
    <div>
      <Dashboard />
    </div>
  );
}
