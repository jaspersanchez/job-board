import { useState } from "react";
import { JobCard } from "@/components/JobCard";
import { SearchBar } from "@/components/SearchBar";
import type { Job } from "@/types";

const mockJobs: Job[] = [
  {
    id: 1,
    title: "React Developer",
    company: "TechCorp Manila",
    location: "Manila, PH",
    salary: "₱60,000 - ₱90,000",
    remote: true,
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "StartupXYZ",
    location: "BGC, Taguig",
    salary: "₱70,000 - ₱100,000",
    remote: false,
  },
  {
    id: 3,
    title: "Frontend Engineer",
    company: "Digital Solutions Inc",
    location: "Makati, PH",
    salary: "₱55,000 - ₱85,000",
    remote: true,
  },
  {
    id: 4,
    title: "Node.js Backend Developer",
    company: "TechCorp Manila",
    location: "Quezon City, PH",
    salary: "₱65,000 - ₱95,000",
    remote: false,
  },
  {
    id: 5,
    title: "Senior React Developer",
    company: "Innovation Labs",
    location: "Remote",
    salary: "₱90,000 - ₱130,000",
    remote: true,
  },
];

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter jobs based on search query
  const filteredJobs = mockJobs.filter((job) => {
    const query = searchQuery.toLowerCase();
    return (
      job.title.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query) ||
      job.location.toLowerCase().includes(query)
    );
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

        {filteredJobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No jobs found matching "{searchQuery}"
            </p>
            <p className="text-gray-400 text-sm mt-2">Try different keywords</p>
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
