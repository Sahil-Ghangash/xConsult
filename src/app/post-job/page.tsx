'use client';

import { useState, useEffect } from 'react';
import { FiUpload, FiSave, FiSend, FiPlus, FiTrash } from 'react-icons/fi';
import { useSearchParams } from 'next/navigation';

interface JobFormData {
  title: string;
  service: string;
  budget: string;
  duration: string;
  description: string;
  requirements: string;
  location: string;
  deadline: string;
  skills: string[];
  attachments: File[];
  preferredVendors: string[];
}

const services = [
  'Strategy Consulting',
  'Operations Consulting',
  'Financial Consulting',
  'Technology Consulting',
  'Human Capital / People & Change',
  'Risk & Compliance',
  'Customer & Marketing Strategy',
  'Sustainability & ESG Consulting',
  'Public Sector & Government Consulting',
  'M&A, Healthcare & IT Consulting'
];

export default function PostJob() {
  const searchParams = useSearchParams();

  const intialFormState = {
    title: '',
    service: '',
    budget: '',
    duration: '',
    description: '',
    requirements: '',
    location: '',
    deadline: '',
    skills: [],
    attachments: [],
    preferredVendors: []
  }
  
  const [formData, setFormData] = useState<JobFormData>(intialFormState);
  const [newSkill, setNewSkill] = useState('');
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    const serviceParam = searchParams.get('service');
    if (serviceParam) {
      setFormData(prev => ({ ...prev, service: decodeURIComponent(serviceParam) }));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      showToast('Project posted successfully!', 'success');
      setFormData(intialFormState)
    } catch (err: unknown) {
      console.error(err);
      showToast('Error posting project. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | ''>('');

  const showToast = (message: string, type: 'success' | 'error') => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => {
      setToastMessage('');
      setToastType('');
    }, 3000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  const addSkill = () => {
    if (newSkill && !formData.skills.includes(newSkill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill]
      }));
      setNewSkill('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Post a Consulting Project
            </h1>
            <button
              type="button"
              onClick={() => setPreviewMode(!previewMode)}
              className="btn-secondary"
            >
              {previewMode ? 'Edit Mode' : 'Preview'}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Project Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                required
                className="input-field"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>

            <div>
              <label htmlFor="service" className="block text-sm font-medium text-gray-700">
                Service Category
              </label>
              <select
                name="service"
                id="service"
                required
                className="input-field"
                value={formData.service}
                onChange={(e) => setFormData(prev => ({ ...prev, service: e.target.value }))}
              >
                <option value="">Select a service</option>
                {services.map((service, index) => (
                  <option key={index} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                  Budget Range (USD)
                </label>
                <input
                  type="text"
                  name="budget"
                  id="budget"
                  required
                  placeholder="e.g., 100,000 - 200,000"
                  className="input-field"
                  value={formData.budget}
                  onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                />
              </div>

              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                  Project Duration
                </label>
                <input
                  type="text"
                  name="duration"
                  id="duration"
                  required
                  placeholder="e.g., 6 months"
                  className="input-field"
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Project Description
              </label>
              <textarea
                name="description"
                id="description"
                rows={4}
                required
                className="input-field"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>

            <div>
              <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">
                Requirements & Qualifications
              </label>
              <textarea
                name="requirements"
                id="requirements"
                rows={4}
                required
                className="input-field"
                value={formData.requirements}
                onChange={(e) => setFormData(prev => ({ ...prev, requirements: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  required
                  placeholder="e.g., Global, Remote, or Specific Location"
                  className="input-field"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>

              <div>
                <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
                  Proposal Deadline
                </label>
                <input
                  type="date"
                  name="deadline"
                  id="deadline"
                  required
                  className="input-field"
                  value={formData.deadline}
                  onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Required Skills & Expertise
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="input-field"
                  placeholder="Add required skill"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="btn-secondary"
                >
                  <FiPlus />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          skills: prev.skills.filter((_, i) => i !== index)
                        }));
                      }}
                      className="ml-2 text-blue-400 hover:text-blue-600"
                    >
                      <FiTrash size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Attachments
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer text-blue-600 hover:text-blue-700"
                >
                  <FiUpload className="mx-auto h-12 w-12 mb-4" />
                  <span>Upload project documents</span>
                </label>
              </div>
              <div className="space-y-2">
                {formData.attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span>{file.name}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          attachments: prev.attachments.filter((_, i) => i !== index)
                        }));
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FiTrash />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="btn-secondary"
                disabled={true}
                title='Comming soon...'
              >
                <FiSave />
                Save as Draft
              </button>
              <button
                type="submit"
                className="btn-primary"
                disabled={isSubmitting}
              >
                <FiSend />
                {isSubmitting ? 'Posting...' : 'Post Project'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg ${
            toastType === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white`}
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
} 