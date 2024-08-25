import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();

  // Split the path into parts
  const pathnames = location.pathname.split('/').filter((item) => item);

  return (
    <nav className="text-sm">
      <ul className="flex space-x-2">
        {/* Home Link */}
        <li>
          <Link to="/" className="hover:underline text-gray-600 uppercase text-xs font-quicksand">Home</Link>
        </li>
        {/* Breadcrumb Links */}
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li key={to} className="flex items-center">
              <span className="mr-2 text-gray-500">/</span>
              {!isLast ? (
                <Link to={to} className="hover:underline text-gray-600 uppercase text-xs font-quicksand">
                  {decodeURIComponent(value)}
                </Link>
              ) : (
                <span className="text-gray-500 uppercase font-quicksand text-xs">{decodeURIComponent(value)}</span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
