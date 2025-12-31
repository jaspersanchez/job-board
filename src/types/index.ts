export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  remote: boolean;
  salary: string
  salaryMin?: number; // Add this for filtering
  salaryMax?: number; // Add this for filtering
}

export type SuccessState = {
  visible: boolean;
  type: 'add' | 'delete' | null;
};


export interface Filters {
  remote: boolean | null;
  minSalary: number;
}
