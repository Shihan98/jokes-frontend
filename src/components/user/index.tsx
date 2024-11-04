"use client";
import { useGetRandomJoke, useSubmitJoke } from "@/hooks/jokes";
import { message } from "antd";
import React, { useState, useEffect } from "react";

interface Joke {
  id: string;
  content: string;
  type: string;
  status: "pending" | "approved" | "rejected";
}

const mockJokeTypes = ["Pun", "Dad Joke", "One-liner", "Knock-knock", "Riddle"];

const UserDashboard = () => {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [selectedType, setSelectedType] = useState("all");
  const [newJoke, setNewJoke] = useState({
    content: "",
    type: mockJokeTypes[0],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data, isLoading, isError, error } = useGetRandomJoke(
    selectedType !== "all" ? selectedType : undefined,
  );
  const mutation = useSubmitJoke();

  useEffect(() => {
    if (data) {
      setJokes((prev) => [
        ...prev,
        {
          id: data.id,
          content: data.content,
          type: data.type,
          status: "approved",
        },
      ]);
    }
  }, [data]);

  const filteredJokes =
    selectedType === "all"
      ? jokes.filter((joke) => joke.status !== "pending")
      : jokes.filter(
          (joke) => joke.type === selectedType && joke.status !== "pending",
        );

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
    setJokes([]); // Clear jokes list to show only new filtered jokes
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await mutation.mutateAsync({
        content: newJoke.content,
        type: newJoke.type,
      });
      console.log("Joke submitted successfully!");
      message.success("Joke submitted successfully!");
      setNewJoke({ content: "", type: mockJokeTypes[0] });
    } catch (error) {
      console.error("Failed to submit joke:", error);
      message.success("Failed to submit joke. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  console.log(data);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Jokes Community
          </h1>
        </div>
      </header>

      <main className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Left side - Jokes List */}
            <div className="space-y-6 lg:col-span-2">
              <div className="rounded-lg bg-white p-4 shadow">
                <select
                  value={selectedType}
                  onChange={handleTypeChange}
                  className="w-full rounded-md border border-gray-300 p-2"
                >
                  <option value="all">All Types</option>
                  {mockJokeTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-4">
                {isLoading && <p>Loading joke...</p>}
                {isError && (
                  <p className="text-red-600">
                    Error:
                    {(error as any)?.response?.data?.message ||
                      "An unexpected error occurred"}
                  </p>
                )}
                {filteredJokes.map((joke) => (
                  <div
                    key={joke.id}
                    className="rounded-lg bg-white p-6 shadow-md"
                  >
                    <p className="mb-4 text-lg text-gray-800">{joke.content}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Type: {joke.type}
                      </span>
                      <span className="rounded-full bg-green-300/50 px-3 py-1 text-xs font-medium text-yellow-800">
                        {joke.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side - Submit Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-6 rounded-lg bg-white p-6 shadow-md">
                <h2 className="mb-4 text-xl font-semibold">
                  Submit a New Joke
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Your Joke
                    </label>
                    <textarea
                      value={newJoke.content}
                      onChange={(e) =>
                        setNewJoke((prev) => ({
                          ...prev,
                          content: e.target.value,
                        }))
                      }
                      rows={4}
                      required
                      className="w-full rounded-md border border-gray-300 p-2"
                      placeholder="Type your joke here..."
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Joke Type
                    </label>
                    <select
                      value={newJoke.type}
                      onChange={(e) =>
                        setNewJoke((prev) => ({
                          ...prev,
                          type: e.target.value,
                        }))
                      }
                      required
                      className="w-full rounded-md border border-gray-300 p-2"
                    >
                      {mockJokeTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !newJoke.content.trim()}
                    className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Joke"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
