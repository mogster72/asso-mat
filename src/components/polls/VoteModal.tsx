import React from 'react';
import { Vote } from 'lucide-react';
import { Poll } from '../../types';

interface VoteModalProps {
  poll: Poll;
  onVote: (pollId: string, option: string) => void;
  onClose: () => void;
}

export default function VoteModal({ poll, onVote, onClose }: VoteModalProps) {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-medium text-gray-900 mb-4">{poll.title}</h3>
        <p className="text-gray-600 mb-6">{poll.description}</p>

        <div className="space-y-3">
          {poll.options.map((option) => (
            <button
              key={option}
              onClick={() => onVote(poll.id, option)}
              className="w-full flex items-center justify-between px-4 py-3 border rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <span className="text-gray-900">{option}</span>
              <Vote className="h-5 w-5 text-gray-400" />
            </button>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}