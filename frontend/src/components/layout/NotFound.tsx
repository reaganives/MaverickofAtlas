import { Link } from 'react-router-dom';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';  // Fun icon

export default function NotFound() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center text-center bg-gray-100">
      <SentimentVeryDissatisfiedIcon sx={{ fontSize: 100, color: 'gray' }} />
      <h1 className="text-4xl font-semibold text-ivyPurple mt-6">404 - Page Not Found</h1>
      <p className="text-gray-600 mt-2 mb-6">Oops! The page you're looking for doesn't exist.</p>
      
      <Link to="/" className="bg-ivyPurple text-white py-2 px-6 rounded-md text-lg hover:bg-ivyPurple/80 transition-all">
        Go back home
      </Link>
    </div>
  );
}
