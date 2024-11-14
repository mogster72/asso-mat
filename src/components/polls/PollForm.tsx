import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Vote } from 'lucide-react';

const pollSchema = z.object({
  title: z.string().min(2, 'Le titre doit contenir au moins 2 caractères'),
  description: z.string().min(10, 'La description doit contenir au moins 10 caractères'),
  options: z.array(z.string()).min(2, 'Au moins 2 options sont requises'),
  deadline: z.string(),
});

type PollFormData = z.infer<typeof pollSchema>;

interface PollFormProps {
  onSubmit: (data: PollFormData) => void;
  onCancel: () => void;
}

export default function PollForm({ onSubmit, onCancel }: PollFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<PollFormData>({
    resolver: zodResolver(pollSchema),
    defaultValues: {
      options: ['', '']
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Titre
        </label>
        <input
          {...register('title')}
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          {...register('description')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Options
        </label>
        <div className="space-y-2">
          {['Option 1', 'Option 2'].map((_, index) => (
            <input
              key={index}
              {...register(`options.${index}`)}
              type="text"
              placeholder={`Option ${index + 1}`}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          ))}
        </div>
        {errors.options && (
          <p className="mt-1 text-sm text-red-600">{errors.options.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
          Date limite
        </label>
        <input
          {...register('deadline')}
          type="datetime-local"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.deadline && (
          <p className="mt-1 text-sm text-red-600">{errors.deadline.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Vote className="h-5 w-5 mr-2" />
          Créer
        </button>
      </div>
    </form>
  );
}