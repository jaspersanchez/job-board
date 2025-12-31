import { useState } from "react";
import { JobCard } from "@/components/JobCard";
import { SearchBar } from "@/components/SearchBar";
import { JobFilters } from "@/components/JobFilters";
import type { Job, Filters } from "@/types";

const mockJobs: Job[] = [
  {
    id: 1,
    title: "React Developer",
    company: "TechCorp Manila",
    location: "Manila, PH",
    salaryMin: 60000,
    salaryMax: 90000,
    remote: true,
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "StartupXYZ",
    location: "BGC, Taguig",
    salaryMin: 70000,
    salaryMax: 100000,
    remote: false,
  },
  {
    id: 3,
    title: "Frontend Engineer",
    company: "Digital Solutions Inc",
    location: "Makati, PH",
    salaryMin: 55000,
    salaryMax: 85000,
    remote: true,
  },
  {
    id: 4,
    title: "Node.js Backend Developer",
    company: "TechCorp Manila",
    location: "Quezon City, PH",
    salaryMin: 65000,
    salaryMax: 95000,
    remote: false,
  },
  {
    id: 5,
    title: "Senior React Developer",
    company: "Innovation Labs",
    location: "Remote",
    salaryMin: 90000,
    salaryMax: 130000,
    remote: true,
  },
  {
    id: 6,
    title: "Junior Frontend Developer",
    company: "WebDev PH",
    location: "Pasig, PH",
    salaryMin: 35000,
    salaryMax: 50000,
    remote: false,
  },
  {
    id: 7,
    title: "DevOps Engineer",
    company: "Cloud Systems Inc",
    location: "Remote",
    salaryMin: 100000,
    salaryMax: 150000,
    remote: true,
  },
];

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Filters>({
    remote: null,
    minSalary: 0,
  });

  // Apply all filters
  const filteredJobs = mockJobs.filter((job) => {
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

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Job Listings</h1>
        <p className="text-gray-600 mb-8">
          {filteredJobs.length} {filteredJobs.length === 1 ? "job" : "jobs"}{" "}
          found
        </p>

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
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
