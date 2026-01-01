import { useState } from 'react';
import { JobCard } from '@/components/JobCard';
import { SearchBar } from '@/components/SearchBar';
import { JobFilters } from '@/components/JobFilters';
import { JobForm } from '@/components/JobForm';
import type { Job, Filters, SuccessState } from '@/types';

const initialJobs: Job[] = [
  {
    id: 1,
    title: "React Developer",
    company: "TechCorp Manila",
    location: "Manila, PH",
    salary: "₱60,000 - ₱90,000",
    salaryMin: 60000,
    salaryMax: 90000,
    remote: true
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "StartupXYZ",
    location: "BGC, Taguig",
    salary: "₱70,000 - ₱100,000",
    salaryMin: 70000,
    salaryMax: 100000,
    remote: false
  },
  {
    id: 3,
    title: "Frontend Engineer",
    company: "Digital Solutions Inc",
    location: "Makati, PH",
    salary: "₱55,000 - ₱85,000",
    salaryMin: 55000,
    salaryMax: 85000,
    remote: true
  },
  {
    id: 4,
    title: "Node.js Backend Developer",
    company: "TechCorp Manila",
    location: "Quezon City, PH",
    salary: "₱65,000 - ₱95,000",
    salaryMin: 65000,
    salaryMax: 95000,
    remote: false
  },
  {
    id: 5,
    title: "Senior React Developer",
    company: "Innovation Labs",
    location: "Remote",
    salary: "₱90,000 - ₱130,000",
    salaryMin: 90000,
    salaryMax: 130000,
    remote: true
  },
  {
    id: 6,
    title: "Junior Frontend Developer",
    company: "WebDev PH",
    location: "Pasig, PH",
    salary: "₱35,000 - ₱50,000",
    salaryMin: 35000,
    salaryMax: 50000,
    remote: false
  },
  {
    id: 7,
    title: "DevOps Engineer",
    company: "Cloud Systems Inc",
    location: "Remote",
    salary: "₱100,000 - ₱150,000",
    salaryMin: 100000,
    salaryMax: 150000,
    remote: true
  }
];

function App() {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
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
  const [jobToDelete, setJobToDelete] = useState<Job['id'] | null>(null);

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

  const handleAddJob = (newJob: Omit<Job, 'id'>) => {
    const jobWithId: Job = {
      ...newJob,
      id: Date.now(), // Simple ID generation
    };

    setJobs([jobWithId, ...jobs]); // Add to beginning of list
    setIsFormOpen(false);

    // Show success message
    setSuccess({ ...success, visible: true, type: 'add' });
    setTimeout(() => setSuccess({ ...success, visible: false, type: null }), 3000);
  };

  const handleDeleteJob = (id: Job['id']) => {
    setJobs(prevJobs => prevJobs.filter(job => job.id !== id))
    setJobToDelete(null)

    // Show success message
    setSuccess({ ...success, visible: true, type: 'delete' });
    setTimeout(() => setSuccess({ ...success, visible: false, type: null }), 3000);
  }

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
          ) :
            (
              <div className="mb-6 bg-green-50 border-2 border-green-500 rounded-lg p-4 flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="text-green-800 font-semibold">Job deleted successfully!</p>
                </div>
              </div>
            )
        )
        }

        <SearchBar onSearch={setSearchQuery} />

        <JobFilters filters={filters} onFilterChange={setFilters} />

        {filteredJobs.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">😔</div>
            <p className="text-gray-700 text-lg font-semibold mb-2">
              No jobs found
            </p>
            <p className="text-gray-500 text-sm">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map(job => (
              <JobCard key={job.id} job={job} setJobToDelete={setJobToDelete} />
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

      {
        jobToDelete && (
          <div className='fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50'>
            <div className='flex flex-col items-center justify-between p-4 bg-white rounded-lg shadow-xl max-w-sm w-full h-[20vh] overflow-y-auto'>
              <svg className="mx-auto mb-4 text-fg-disabled w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
              <h3 className="mb-6x max-w-[25ch] text-center">Are you sure you want to delete this job listing?</h3>
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
        )
      }
    </div>
  );
}

export default App;
