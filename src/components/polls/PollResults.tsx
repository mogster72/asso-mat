import React from 'react';
import { BarChart, X } from 'lucide-react';
import { Poll } from '../../types';

interface PollResultsProps {
  poll: Poll;
  results: Record<string, number>;
  onClose: () => void;
}

export default function PollResults({ poll, results, onClose }: PollResultsProps) {
  const totalVotes = Object.values(results).reduce((sum, count) => sum + count, 0);

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">{poll.title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4">
          {poll.options.map((option) => {
            const voteCount = results[option] || 0;
            const percentage = totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0;

            return (
              <div key={option}>
                <div className="flex justify-between text-sm font-medium text-gray-900 mb-1">
                  <span>{option}</span>
                  <span>{voteCount} votes ({percentage.toFixed(1)}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-indigo-600 h-2.5 rounded-full"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 text-sm text-gray-500 text-center">
          Total des votes : {totalVotes}
        </div>
      </div>
    </div>
  );
}