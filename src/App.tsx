import { JobCard } from "./components/JobCard";

const mockJobs = [
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
];

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Job Listings</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
