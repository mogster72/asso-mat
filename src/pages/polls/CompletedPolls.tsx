import React, { useState } from 'react';
import { BarChart, Users, Calendar } from 'lucide-react';
import PollResults from '../../components/polls/PollResults';
import { usePolls } from '../../hooks/usePolls';
import { Link } from 'react-router-dom';

export default function CompletedPolls() {
  const [showResults, setShowResults] = useState<string | null>(null);
  const { polls, getResults } = usePolls();

  const completedPolls = polls.filter(poll => new Date(poll.deadline) <= new Date());

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Votes terminés</h1>
        <Link 
          to="/app/polls"
          className="text-indigo-600 hover:text-indigo-800 font-medium"
        >
          Voir les votes en cours
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        {completedPolls.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            Aucun vote terminé
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {completedPolls.map((poll) => (
              <div key={poll.id} className="bg-white border rounded-lg overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {poll.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{poll.description}</p>
                  <div className="flex items-center text-gray-500 mb-2">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>Terminé le {new Date(poll.deadline).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-gray-500 mb-4">
                    <Users className="h-5 w-5 mr-2" />
                    <span>{Object.keys(poll.votes).length} votes</span>
                  </div>

                  <button
                    onClick={() => setShowResults(poll.id)}
                    className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <BarChart className="h-5 w-5 mr-2" />
                    Voir les résultats
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

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