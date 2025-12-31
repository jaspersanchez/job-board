export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  remote: boolean;
  salaryMin?: number; // Add this for filtering
  salaryMax?: number; // Add this for filtering
}

export interface Filters {
  remote: boolean | null;
  minSalary: number;
}
