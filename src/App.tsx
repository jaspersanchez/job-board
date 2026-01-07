import { useState, useEffect } from 'react';
import { JobCard } from '@components/JobCard';
import { SearchBar } from '@components/SearchBar';
import { JobFilters } from '@components/JobFilters';
import { JobForm } from '@components/JobForm';
import type { Job, Filters, SuccessState } from '@/types';
import { fetchJobs, createJob, deleteJob } from '@/services/api';

function App() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Filters>({
    remote: null,
    minSalary: 0
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [success, setSuccess] = useState<SuccessState>({
    visible: false,
    type: null,
  });
  const [jobToDelete, setJobToDelete] = useState<Job['_id'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch jobs on mount
  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchJobs();
      setJobs(data);
    } catch (err) {
      setError('Failed to load jobs. Make sure the backend is running.');
      console.error('Error loading jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  // Apply all filters
  const filteredJobs = jobs.filter(job => {
    // Search filter
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      job.title.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query) ||
      job.location.toLowerCase().includes(query);

    // Remote filter
    const matchesRemote =
      filters.remote === null || job.remote === filters.remote;

    // Salary filter
    const matchesSalary =
      filters.minSalary === 0 ||
      (job.salaryMax !== undefined && job.salaryMax >= filters.minSalary);

    return matchesSearch && matchesRemote && matchesSalary;
  });

  const handleAddJob = async (newJob: Omit<Job, '_id'>) => {
    try {
      const createdJob = await createJob(newJob);
      setJobs([createdJob, ...jobs]); // Add to beginning of list
      setIsFormOpen(false);

      // Show success message
      setSuccess(prev => ({ ...prev, visible: true, type: 'add' }));
      setTimeout(() => setSuccess(prev => ({ ...prev, visible: false, type: null })), 3000);
    } catch (err) {
      alert('Failed to create job. Please try again.');
      console.error('Error creating job:', err);
    }
  };

  const handleDeleteJob = async (id: Job['_id']) => {
    try {
      await deleteJob(id);
      setJobs(prevJobs => prevJobs.filter(job => job._id !== id));
      setJobToDelete(null);

      // Show success message
      setSuccess(prev => ({ ...prev, visible: true, type: 'delete' }));
      setTimeout(() => setSuccess(prev => ({ ...prev, visible: false, type: null })), 3000);
    } catch (err) {
      alert('Failed to delete job. Please try again.');
      console.error('Error deleting job:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-4xl font-bold text-gray-900">
            Job Listings
          </h1>
          <button
            onClick={() => setIsFormOpen(true)}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-md hover:shadow-lg"
          >
            + Post Job
          </button>
        </div>

        <p className="text-gray-600 mb-8">
          {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} found
        </p>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border-2 border-red-500 rounded-lg p-4 flex items-center gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <p className="text-red-800 font-semibold">Error loading jobs</p>
              <p className="text-red-600 text-sm">{error}</p>
              <button
                onClick={loadJobs}
                className="mt-2 text-sm text-red-700 underline hover:text-red-900"
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {/* Success Message */}
        {success.visible && (
          success.type === 'add' ? (
            <div className="mb-6 bg-green-50 border-2 border-green-500 rounded-lg p-4 flex items-center gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <p className="text-green-800 font-semibold">Job posted successfully!</p>
                <p className="text-green-600 text-sm">Your job listing is now live.</p>
              </div>
            </div>
          ) : (
            <div className="mb-6 bg-green-50 border-2 border-green-500 rounded-lg p-4 flex items-center gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <p className="text-green-800 font-semibold">Job deleted successfully!</p>
              </div>
            </div>
          )
        )}

        <SearchBar onSearch={setSearchQuery} />

        <JobFilters filters={filters} onFilterChange={setFilters} />

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600"></div>
            <p className="text-gray-600 mt-4">Loading jobs...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">😔</div>
            <p className="text-gray-700 text-lg font-semibold mb-2">
              No jobs found
            </p>
            <p className="text-gray-500 text-sm">
              {jobs.length === 0
                ? 'Be the first to post a job!'
                : 'Try adjusting your search or filters'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map(job => (
              <JobCard key={job._id} job={job} setJobToDelete={setJobToDelete} />
            ))}
          </div>
        )}
      </div>

      {/* Job Form Modal */}
      {isFormOpen && (
        <JobForm
          onSubmit={handleAddJob}
          onCancel={() => setIsFormOpen(false)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {jobToDelete && (
        <div className='fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50'>
          <div className='flex flex-col items-center justify-between p-4 bg-white rounded-lg shadow-xl max-w-sm w-full h-[20vh] overflow-y-auto'>
            <svg className="mx-auto text-gray-400 w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <h3 className="max-w-[25ch] text-center">Are you sure you want to delete this job listing?</h3>
            <div className='flex gap-3 mt-4'>
              <button
                type="button"
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => setJobToDelete(null)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 active:bg-red-700 transition-colors"
                onClick={() => handleDeleteJob(jobToDelete)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
