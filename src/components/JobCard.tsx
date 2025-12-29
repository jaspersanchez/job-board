import type { Job } from "@/types";

interface JobCardProps {
  job: Job;
}

export const JobCard = ({ job }: JobCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
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

      {/* Location and Salary - stacked on mobile, side by side on larger screens */}
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
      <button className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors">
        Apply Now
      </button>
    </div>
  );
};
