'use client';

import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

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

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredServices, setFilteredServices] = useState<string[]>([]);
  const [showAllServices, setShowAllServices] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = services.filter(service =>
      service.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredServices(query ? filtered : []);
  };

  const handleServiceSelect = (service: string) => {
    router.push(`/post-job?service=${encodeURIComponent(service)}`);
  };

  const displayedServices = showAllServices ? services : services.slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Find the Right Consulting Services for Your Business
          </h1>
          
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                className="input-field"
                placeholder="Search for consulting services..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
              
              {filteredServices.length > 0 && (
                <div className="absolute w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                  {filteredServices.map((service, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-900"
                      onClick={() => handleServiceSelect(service)}
                    >
                      {service}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-16 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedServices.map((service, index) => (
                <div
                  key={index}
                  className="card cursor-pointer"
                  onClick={() => handleServiceSelect(service)}
                >
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">{service}</h3>
                  <p className="text-gray-600 text-sm">
                    Connect with top consulting firms specializing in {service.toLowerCase()}
                  </p>
                </div>
              ))}
            </div>

            {services.length > 6 && (
              <button
                onClick={() => setShowAllServices(!showAllServices)}
                className="btn-secondary mx-auto"
              >
                {showAllServices ? (
                  <>
                    Show Less <FiChevronUp className="ml-2" />
                  </>
                ) : (
                  <>
                    View More Services <FiChevronDown className="ml-2" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
