interface StatsCardProps {
  pendingCount: number;
}

const StatsCard = ({ pendingCount }: StatsCardProps) => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h3 className="text-lg font-medium text-gray-900">Pending Jokes</h3>
      <p className="text-primary mt-2 text-3xl font-semibold">{pendingCount}</p>
      <p className="mt-1 text-sm text-gray-500">Jokes awaiting moderation</p>
    </div>
  );
};

export default StatsCard;
