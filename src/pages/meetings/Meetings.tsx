import React, { useState } from 'react';
import { FileText, Calendar, Users, Download, Pencil, Trash2, Plus, Upload } from 'lucide-react';
import { useMeetings } from '../../hooks/useMeetings';
import MeetingForm from '../../components/meetings/MeetingForm';
import MinutesForm from '../../components/meetings/MinutesForm';
import DocumentUpload from '../../components/meetings/DocumentUpload';
import { Meeting } from '../../types';

export default function Meetings() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isMinutesModalOpen, setIsMinutesModalOpen] = useState(false);
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
  const [editingMeeting, setEditingMeeting] = useState<Meeting | null>(null);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const { meetings, addMeeting, updateMeeting, removeMeeting, addMinutes, addDocument, removeDocument } = useMeetings();

  const handleSubmit = (data: any) => {
    if (editingMeeting) {
      updateMeeting(editingMeeting.id, {
        ...data,
        date: new Date(data.date)
      });
    } else {
      addMeeting({
        ...data,
        associationId: '1',
        participants: [],
        date: new Date(data.date),
        status: 'planned'
      });
    }
    setIsCreateModalOpen(false);
    setEditingMeeting(null);
  };

  const handleEdit = (meeting: Meeting) => {
    setEditingMeeting(meeting);
    setIsCreateModalOpen(true);
  };

  const handleDelete = (meetingId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette réunion ?')) {
      removeMeeting(meetingId);
    }
  };

  const handleMinutesSubmit = (data: { minutes: string }, files?: File[]) => {
    if (selectedMeeting) {
      addMinutes(selectedMeeting.id, data.minutes);
      files?.forEach(file => {
        addDocument(selectedMeeting.id, {
          name: file.name,
          url: URL.createObjectURL(file)
        });
      });
      setIsMinutesModalOpen(false);
      setSelectedMeeting(null);
    }
  };

  const handleDocumentUpload = (files: File[]) => {
    if (selectedMeeting) {
      files.forEach(file => {
        addDocument(selectedMeeting.id, {
          name: file.name,
          url: URL.createObjectURL(file)
        });
      });
      setIsDocumentModalOpen(false);
    }
  };

  const handleDeleteDocument = (meetingId: string, documentId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce document ?')) {
      removeDocument(meetingId, documentId);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Réunions et bilans</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nouvelle réunion
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {meetings.map((meeting) => (
          <div key={meeting.id} className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{meeting.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{meeting.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{new Date(meeting.date).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      <span>{meeting.participants.length} participants</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => {
                      setSelectedMeeting(meeting);
                      setIsDocumentModalOpen(true);
                    }}
                    className="p-1 text-gray-400 hover:text-indigo-600 transition-colors"
                  >
                    <Upload className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleEdit(meeting)}
                    className="p-1 text-gray-400 hover:text-indigo-600 transition-colors"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(meeting.id)}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {meeting.documents.length > 0 && (
                <div className="mt-4 border-t pt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Documents joints</h4>
                  <div className="space-y-2">
                    {meeting.documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between bg-gray-50 p-2 rounded text-sm">
                        <div className="flex items-center overflow-hidden">
                          <FileText className="h-4 w-4 text-gray-400 flex-shrink-0 mr-2" />
                          <span className="text-gray-600 truncate">{doc.name}</span>
                        </div>
                        <div className="flex space-x-2 ml-2">
                          {doc.url && (
                            <a
                              href={doc.url}
                              download={doc.name}
                              className="text-indigo-600 hover:text-indigo-800"
                            >
                              <Download className="h-4 w-4" />
                            </a>
                          )}
                          <button
                            onClick={() => handleDeleteDocument(meeting.id, doc.id)}
                            className="text-gray-400 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-4 flex justify-end">
                {meeting.status === 'completed' && meeting.minutes ? (
                  <button className="flex items-center px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger le compte-rendu
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedMeeting(meeting);
                      setIsMinutesModalOpen(true);
                    }}
                    className="flex items-center px-3 py-1.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Ajouter le compte-rendu
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full m-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {editingMeeting ? 'Modifier la réunion' : 'Nouvelle réunion'}
            </h3>
            <MeetingForm
              onSubmit={handleSubmit}
              onCancel={() => {
                setIsCreateModalOpen(false);
                setEditingMeeting(null);
              }}
              initialData={editingMeeting}
            />
          </div>
        </div>
      )}

      {isMinutesModalOpen && selectedMeeting && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full m-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Ajouter un compte-rendu - {selectedMeeting.title}
            </h3>
            <MinutesForm
              onSubmit={handleMinutesSubmit}
              onCancel={() => {
                setIsMinutesModalOpen(false);
                setSelectedMeeting(null);
              }}
              initialMinutes={selectedMeeting.minutes}
              existingFiles={selectedMeeting.documents.map(doc => doc.name)}
            />
          </div>
        </div>
      )}

      {isDocumentModalOpen && selectedMeeting && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full m-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Ajouter des documents - {selectedMeeting.title}
            </h3>
            <DocumentUpload
              onUpload={handleDocumentUpload}
              existingFiles={selectedMeeting.documents.map(doc => doc.name)}
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsDocumentModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}