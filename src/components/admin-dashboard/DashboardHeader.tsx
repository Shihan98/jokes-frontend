"use client";
import { useRouter } from "next/navigation";

const DashboardHeader = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/admin/login");
  };

  return (
    <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Joke Moderation Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="rounded-md bg-blue-950 px-4 py-2 text-sm text-white hover:bg-blue-950/90"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
