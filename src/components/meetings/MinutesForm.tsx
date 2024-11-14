import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FileText } from 'lucide-react';
import DocumentUpload from './DocumentUpload';

const minutesSchema = z.object({
  minutes: z.string().min(10, 'Le compte-rendu doit contenir au moins 10 caractères'),
});

type MinutesFormData = z.infer<typeof minutesSchema>;

interface MinutesFormProps {
  onSubmit: (data: MinutesFormData, files?: File[]) => void;
  onCancel: () => void;
  initialMinutes?: string;
  existingFiles?: string[];
}

export default function MinutesForm({ onSubmit, onCancel, initialMinutes, existingFiles }: MinutesFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<MinutesFormData>({
    resolver: zodResolver(minutesSchema),
    defaultValues: {
      minutes: initialMinutes || ''
    }
  });

  const [uploadedFiles, setUploadedFiles] = React.useState<File[]>([]);

  const handleFormSubmit = (data: MinutesFormData) => {
    onSubmit(data, uploadedFiles);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <label htmlFor="minutes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Compte-rendu
        </label>
        <textarea
          {...register('minutes')}
          rows={10}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="Saisissez le compte-rendu de la réunion..."
        />
        {errors.minutes && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.minutes.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Documents joints
        </label>
        <DocumentUpload
          onUpload={setUploadedFiles}
          existingFiles={existingFiles}
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <FileText className="h-5 w-5 mr-2" />
          Enregistrer
        </button>
      </div>
    </form>
  );
}