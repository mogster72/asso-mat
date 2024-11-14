import React, { useState } from 'react';
import { Vote, Users, Calendar, BarChart } from 'lucide-react';
import PollForm from '../../components/polls/PollForm';
import VoteModal from '../../components/polls/VoteModal';
import PollResults from '../../components/polls/PollResults';
import { usePolls } from '../../hooks/usePolls';
import { useAuth } from '../../contexts/AuthContext';
import { Poll } from '../../types';

export default function Polls() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedPoll, setSelectedPoll] = useState<Poll | null>(null);
  const [showResults, setShowResults] = useState<string | null>(null);
  const { polls, addPoll, vote, getResults } = usePolls();
  const { user } = useAuth();

  const handleSubmit = (data: any) => {
    addPoll({
      ...data,
      associationId: '1',
      deadline: new Date(data.deadline)
    });
    setIsCreateModalOpen(false);
  };

  const handleVote = (pollId: string, option: string) => {
    if (user) {
      vote(pollId, user.id, option);
      setSelectedPoll(null);
      setShowResults(pollId);
    }
  };

  const hasVoted = (poll: Poll) => {
    return user ? !!poll.votes[user.id] : false;
  };

  const isPollActive = (poll: Poll) => {
    return new Date(poll.deadline) > new Date();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Votes et sondages</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-gray-900">Votes en cours</h2>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Vote className="h-5 w-5 mr-2" />
            Créer un vote
          </button>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {polls.map((poll) => (
            <div key={poll.id} className="bg-white border rounded-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {poll.title}
                </h3>
                <p className="text-gray-600 mb-4">{poll.description}</p>
                <div className="flex items-center text-gray-500 mb-2">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>Fin le {new Date(poll.deadline).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-gray-500 mb-4">
                  <Users className="h-5 w-5 mr-2" />
                  <span>{Object.keys(poll.votes).length} votes</span>
                </div>

                {isPollActive(poll) ? (
                  hasVoted(poll) ? (
                    <div className="space-y-2">
                      <div className="text-green-600 font-medium mb-2">Vous avez déjà voté</div>
                      <button
                        onClick={() => setShowResults(poll.id)}
                        className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        <BarChart className="h-5 w-5 mr-2" />
                        Voir les résultats
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setSelectedPoll(poll)}
                      className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      <Vote className="h-5 w-5 mr-2" />
                      Voter
                    </button>
                  )
                ) : (
                  <div className="space-y-2">
                    <div className="text-red-600 font-medium mb-2">Vote terminé</div>
                    <button
                      onClick={() => setShowResults(poll.id)}
                      className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <BarChart className="h-5 w-5 mr-2" />
                      Voir les résultats
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Poll Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Créer un vote</h3>
            <PollForm 
              onSubmit={handleSubmit}
              onCancel={() => setIsCreateModalOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Vote Modal */}
      {selectedPoll && (
        <VoteModal
          poll={selectedPoll}
          onVote={handleVote}
          onClose={() => setSelectedPoll(null)}
        />
      )}

      {/* Results Modal */}
      {showResults && (
        <PollResults
          poll={polls.find(p => p.id === showResults)!}
          results={getResults(showResults)}
          onClose={() => setShowResults(null)}
        />
      )}
    </div>
  );
}