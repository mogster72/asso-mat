import React, { useState } from 'react';
import { Calendar, MapPin, Users, Pencil, Trash2 } from 'lucide-react';
import EventForm from '../../components/events/EventForm';
import { useEvents } from '../../hooks/useEvents';
import { Event } from '../../types';

export default function Events() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const { events, addEvent, updateEvent, removeEvent } = useEvents();

  const handleSubmit = (data: any) => {
    if (editingEvent) {
      updateEvent(editingEvent.id, {
        ...data,
        date: new Date(data.date)
      });
    } else {
      addEvent({
        ...data,
        associationId: '1',
        participants: [],
        date: new Date(data.date)
      });
    }
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleDelete = (eventId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
      removeEvent(eventId);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Événements</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-gray-900">Événements à venir</h2>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Calendar className="h-5 w-5 mr-2" />
            Créer un événement
          </button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div key={event.id} className="bg-white border rounded-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <div className="flex items-center text-gray-500 mb-2">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{event.date.toLocaleString()}</span>
                </div>
                <div className="flex items-center text-gray-500 mb-4">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center text-gray-500 mb-4">
                  <Users className="h-5 w-5 mr-2" />
                  <span>{event.participants.length} participants</span>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleEdit(event)}
                    className="flex items-center text-indigo-600 hover:text-indigo-900"
                  >
                    <Pencil className="h-4 w-4 mr-1" />
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="flex items-center text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {editingEvent ? 'Modifier l\'événement' : 'Créer un événement'}
            </h3>
            <EventForm 
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              initialData={editingEvent}
            />
          </div>
        </div>
      )}
    </div>
  );
}