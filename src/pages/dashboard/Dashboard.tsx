import React from 'react';
import { Users, Calendar, Vote, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMembers } from '../../hooks/useMembers';
import { useEvents } from '../../hooks/useEvents';
import { usePolls } from '../../hooks/usePolls';
import { useMeetings } from '../../hooks/useMeetings';

export default function Dashboard() {
  const navigate = useNavigate();
  const { members } = useMembers();
  const { events } = useEvents();
  const { polls } = usePolls();
  const { meetings } = useMeetings();

  const activePolls = polls.filter(poll => new Date(poll.deadline) > new Date());
  const upcomingEvents = events.filter(event => new Date(event.date) > new Date());
  const upcomingMeetings = meetings.filter(meeting => new Date(meeting.date) > new Date());

  const dashboardItems = [
    {
      title: 'Membres actifs',
      count: members.length,
      icon: Users,
      path: '/app/members',
      color: 'indigo'
    },
    {
      title: 'Événements à venir',
      count: upcomingEvents.length,
      icon: Calendar,
      path: '/app/events',
      color: 'green'
    },
    {
      title: 'Votes en cours',
      count: activePolls.length,
      icon: Vote,
      path: '/app/polls',
      color: 'blue'
    },
    {
      title: 'Réunions à venir',
      count: upcomingMeetings.length,
      icon: FileText,
      path: '/app/meetings',
      color: 'purple'
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Tableau de bord</h1>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {dashboardItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="bg-white overflow-hidden shadow rounded-lg transition-transform duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <item.icon className={`h-6 w-6 text-${item.color}-500`} />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {item.title}
                    </dt>
                    <dd className="text-lg font-semibold text-gray-900">
                      {item.count}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Section des prochains événements */}
      {upcomingEvents.length > 0 && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Prochains événements</h2>
          <div className="flow-root">
            <ul className="divide-y divide-gray-200">
              {upcomingEvents.slice(0, 3).map((event) => (
                <li 
                  key={event.id}
                  className="py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                  onClick={() => navigate('/app/events')}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Calendar className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {event.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(event.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}