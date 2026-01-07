export interface Job {
  _id: string;  // Changed from 'id: number' to '_id: string'
  title: string;
  company: string;
  location: string;
  salary: string;
  salaryMin: number;
  salaryMax: number;
  remote: boolean;
  createdAt?: string;  // MongoDB adds this
  updatedAt?: string;  // MongoDB adds this
}

export type SuccessState = {
  visible: boolean;
  type: 'add' | 'delete' | null;
};

export interface Filters {
  remote: boolean | null;
  minSalary: number;
}
