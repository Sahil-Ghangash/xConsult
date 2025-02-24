import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-2xl text-blue-600">
          xConsult
        </Link>
        <div className="flex gap-4 items-center">
          <Link 
            href="/post-job" 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Post a Job
          </Link>
          <Link href="/login" className="text-gray-600 hover:text-gray-900">
            Login
          </Link>
          <Link href="/register" className="text-gray-600 hover:text-gray-900">
            Register
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header; 