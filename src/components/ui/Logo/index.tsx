import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to="/" className="flex items-center space-x-3 group">
      <img
        src="../Full_Logo.png"
        alt="newjersey.list logo"
        className="h-8 w-auto"
      />
      <div className="flex items-baseline">
        <span className="text-2xl font-bold text-blue-600 group-hover:text-blue-700 transition-colors">
          newjersey
        </span>
        <span className="text-2xl font-bold text-gray-600 group-hover:text-gray-700 transition-colors">
          .list
        </span>
      </div>
    </Link>
  );
}