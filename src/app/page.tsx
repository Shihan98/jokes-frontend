import UserDashboard from "@/components/user";

export default function Home() {
  return (
    <>
      <div className="flex h-screen w-full flex-col">
        <UserDashboard />
      </div>
    </>
  );
}
