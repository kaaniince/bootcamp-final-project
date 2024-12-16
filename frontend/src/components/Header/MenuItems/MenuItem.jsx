import { Link } from "react-router-dom";

export const MenuItem = ({ title, path, setShowProfileMenu }) => (
  <Link
    to={path}
    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
    onClick={() => setShowProfileMenu(false)}
  >
    {title}
  </Link>
);
