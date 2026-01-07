import type { Job } from '@/types';

interface JobCardProps {
  job: Job;
  setJobToDelete: React.Dispatch<React.SetStateAction<Job['_id'] | null>>;  // Changed id to _id
}

export const JobCard = ({ job, setJobToDelete }: JobCardProps) => {
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
      {/* Header with title and remote badge */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <h2 className="text-xl font-bold text-gray-900 flex-1">{job.title}</h2>
        {job.remote && (
          <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
            🏠 Remote
          </span>
        )}
      </div>

      {/* Company */}
      <p className="text-gray-600 font-medium mb-4">{job.company}</p>

      {/* Location and Salary */}
      <div className="space-y-2 mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>📍</span>
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>💰</span>
          <span>{job.salary}</span>
        </div>
      </div>

      {/* Apply button */}
      <div className="flex gap-2 mt-auto">
        <button className="basis-[80%] bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors">
          Apply Now
        </button>
        <button
          onClick={() => setJobToDelete(job._id)}  // Changed id to _id
          className="flex justify-center basis-[20%] bg-red-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-red-700 active:bg-red-800 transition-colors"
        >
          <svg
            className="w-6 h-6 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
