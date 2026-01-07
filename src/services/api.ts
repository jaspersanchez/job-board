import type { Job } from '@/types';

const API_URL = 'http://localhost:4000/api';

// GET all jobs
export const fetchJobs = async (): Promise<Job[]> => {
  const response = await fetch(`${API_URL}/jobs`);

  if (!response.ok) {
    throw new Error('Failed to fetch jobs');
  }

  return response.json();
};

// POST new job
export const createJob = async (job: Omit<Job, '_id'>): Promise<Job> => {
  const response = await fetch(`${API_URL}/jobs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(job),
  });

  if (!response.ok) {
    throw new Error('Failed to create job');
  }

  return response.json();
};

// DELETE job
export const deleteJob = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/jobs/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete job');
  }
};
