import { useState, useEffect } from "react";
import { Joke } from "@/lib/mockData";
import DashboardHeader from "@/components/admin-dashboard/DashboardHeader";
import JokeCard from "@/components/admin-dashboard/JokeCard";
import StatsCard from "@/components/admin-dashboard/StatsCard";
import { useGetJokesForModeration } from "@/hooks/jokes";

const Dashboard = () => {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const { data: jokeData, isLoading, isError } = useGetJokesForModeration();
  const mockJokeTypes = [
    "Pun",
    "Dad Joke",
    "One-liner",
    "Knock-knock",
    "Riddle",
  ];

  console.log(jokeData);

  useEffect(() => {
    if (jokeData) {
      const formattedJokes = jokeData.map((joke: any) => ({
        id: joke._id,
        content: joke.content,
        type: joke.type,
        status: joke.status,
        submittedAt: joke.submittedAt,
      }));
      setJokes(formattedJokes);
    }
  }, [jokeData]);

  const handleJokeUpdate = (updatedJoke: Joke) => {
    setJokes((prevJokes) =>
      prevJokes.map((joke) =>
        joke.id === updatedJoke.id ? updatedJoke : joke,
      ),
    );
  };

  const handleJokeRemove = (jokeId: string) => {
    setJokes((prevJokes) => prevJokes.filter((joke) => joke.id !== jokeId));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <main className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <StatsCard pendingCount={jokes.length} />
          </div>

          {isLoading ? (
            <div className="text-center text-lg text-gray-600">Loading...</div>
          ) : isError ? (
            <div className="text-center text-lg text-red-600">
              Failed to load data.
            </div>
          ) : jokes.length === 0 ? (
            <div className="rounded-lg bg-white p-6 text-center">
              <p className="text-lg text-gray-600">
                No jokes pending moderation!
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {jokes.map((joke) => (
                <JokeCard
                  key={joke.id}
                  joke={joke}
                  jokeTypes={mockJokeTypes} // replace with `jokeTypes` if dynamic
                  onUpdate={handleJokeUpdate}
                  onRemove={handleJokeRemove}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
