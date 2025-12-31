import { useState } from 'react';
import type { Job } from '@/types';

interface JobFormProps {
  onSubmit: (job: Omit<Job, 'id'>) => void;
  onCancel: () => void;
}

export const JobForm = ({ onSubmit, onCancel }: JobFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    salaryMin: '',
    salaryMax: '',
    remote: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = 'Job title is required';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Job title must be at least 3 characters';
    }

    // Company validation
    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }

    // Location validation
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    // Salary validation
    const salaryMin = Number(formData.salaryMin);
    const salaryMax = Number(formData.salaryMax);

    if (!formData.salaryMin) {
      newErrors.salaryMin = 'Minimum salary is required';
    } else if (salaryMin < 0) {
      newErrors.salaryMin = 'Salary cannot be negative';
    }

    if (!formData.salaryMax) {
      newErrors.salaryMax = 'Maximum salary is required';
    } else if (salaryMax < 0) {
      newErrors.salaryMax = 'Salary cannot be negative';
    }

    if (salaryMin && salaryMax && salaryMin > salaryMax) {
      newErrors.salaryMax = 'Maximum salary must be greater than minimum';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const salaryMin = Number(formData.salaryMin);
    const salaryMax = Number(formData.salaryMax);

    const newJob: Omit<Job, 'id'> = {
      title: formData.title.trim(),
      company: formData.company.trim(),
      location: formData.location.trim(),
      salary: `₱${salaryMin.toLocaleString()} - ₱${salaryMax.toLocaleString()}`,
      salaryMin,
      salaryMax,
      remote: formData.remote,
    };

    onSubmit(newJob);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
          <h2 className="text-2xl font-bold text-gray-900">Post a Job</h2>
          <p className="text-sm text-gray-600 mt-1">
            Fill in the details to post a new job listing
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Job Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
              Job Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Senior React Developer"
              className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none transition-colors ${errors.title
                ? 'border-red-500 focus:border-red-500'
                : 'border-gray-300 focus:border-blue-500'
                }`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          {/* Company Name */}
          <div>
            <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
              Company Name *
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g. TechCorp Manila"
              className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none transition-colors ${errors.company
                ? 'border-red-500 focus:border-red-500'
                : 'border-gray-300 focus:border-blue-500'
                }`}
            />
            {errors.company && (
              <p className="text-red-500 text-sm mt-1">{errors.company}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
              Location *
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Manila, PH or Remote"
              className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none transition-colors ${errors.location
                ? 'border-red-500 focus:border-red-500'
                : 'border-gray-300 focus:border-blue-500'
                }`}
            />
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">{errors.location}</p>
            )}
          </div>

          {/* Salary Range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="salaryMin" className="block text-sm font-semibold text-gray-700 mb-2">
                Minimum Salary (₱) *
              </label>
              <input
                type="number"
                id="salaryMin"
                name="salaryMin"
                value={formData.salaryMin}
                onChange={handleChange}
                placeholder="50000"
                className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none transition-colors ${errors.salaryMin
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:border-blue-500'
                  }`}
              />
              {errors.salaryMin && (
                <p className="text-red-500 text-sm mt-1">{errors.salaryMin}</p>
              )}
            </div>

            <div>
              <label htmlFor="salaryMax" className="block text-sm font-semibold text-gray-700 mb-2">
                Maximum Salary (₱) *
              </label>
              <input
                type="number"
                id="salaryMax"
                name="salaryMax"
                value={formData.salaryMax}
                onChange={handleChange}
                placeholder="80000"
                className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none transition-colors ${errors.salaryMax
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:border-blue-500'
                  }`}
              />
              {errors.salaryMax && (
                <p className="text-red-500 text-sm mt-1">{errors.salaryMax}</p>
              )}
            </div>
          </div>

          {/* Remote Work */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="remote"
                checked={formData.remote}
                onChange={handleChange}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-semibold text-gray-700">
                🏠 This is a remote position
              </span>
            </label>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors"
            >
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
