import { useState } from "react";
import { Joke } from "@/lib/mockData";
import { useApproveJoke, useRejectJoke } from "@/hooks/jokes";
import { message } from "antd";

interface JokeCardProps {
  joke: Joke;
  jokeTypes: string[];
  onUpdate: (joke: Joke) => void;
  onRemove: (id: string) => void;
}

const JokeCard = ({ joke, jokeTypes, onUpdate, onRemove }: JokeCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(joke.content);
  const [type, setType] = useState(joke.type);

  const { mutate: approveJoke, isLoading: isApproving } = useApproveJoke();
  const { mutate: rejectJoke, isLoading: isRejecting } = useRejectJoke();

  const handleApprove = () => {
    approveJoke(
      { jokeId: joke.id, content, type },
      {
        onSuccess: () => {
          onRemove(joke.id);
          message.success("The joke has aproved.");
        },
        onError: (error) => {
          console.error("Failed to approve joke:", error);
          message.error("Failed to approve joke.");
        },
      },
    );
  };

  const handleReject = () => {
    rejectJoke(joke.id, {
      onSuccess: () => {
        onRemove(joke.id);
        message.success("The joke has removed.");
      },
      onError: (error) => {
        console.error("Failed to reject joke:", error);
        message.error("Failed to reject joke.");
      },
    });
  };

  const handleSave = async () => {
    try {
      onUpdate({ ...joke, content, type });
      setIsEditing(false);
      message.success("The joke has successfully updated.");
    } catch (error) {
      console.error("Failed to update joke:", error);
      message.error("Failed to update joke.");
    }
  };

  return (
    <div className="animate-fade-in rounded-lg bg-white p-6 shadow-md">
      <div className="space-y-4">
        {isEditing ? (
          <>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2"
              rows={4}
            />
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2"
            >
              {jokeTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </>
        ) : (
          <>
            <p className="text-lg text-gray-800">{content}</p>
            <p className="text-sm text-gray-600">Type: {type}</p>
          </>
        )}

        <div className="flex justify-between pt-4">
          <div className="space-x-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-500/90"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200/80"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-600/90"
              >
                Edit
              </button>
            )}
          </div>

          {!isEditing && (
            <div className="space-x-2">
              <button
                onClick={handleApprove}
                disabled={isApproving || isRejecting}
                className={`rounded-md bg-green-800 px-4 py-2 text-sm text-white hover:bg-green-800/90 ${
                  isApproving ? "opacity-50" : ""
                }`}
              >
                {isApproving ? "Approving..." : "Approve"}
              </button>
              <button
                onClick={handleReject}
                disabled={isApproving || isRejecting}
                className={`rounded-md bg-red-800 px-4 py-2 text-sm text-white hover:bg-red-800/90 ${
                  isRejecting ? "opacity-50" : ""
                }`}
              >
                {isRejecting ? "Rejecting..." : "Reject"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JokeCard;
