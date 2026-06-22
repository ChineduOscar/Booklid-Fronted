import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#1a1a2e] mt-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-24 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold text-orange-500">Booklid</h2>
        </div>

        <div className="flex gap-8">
          <Link to="/" className="text-sm text-gray-400 hover:text-orange-500 transition-colors">
            Home
          </Link>
          <Link to="/books" className="text-sm text-gray-400 hover:text-orange-500 transition-colors">
            Books
          </Link>
          <Link to="/signin" className="text-sm text-gray-400 hover:text-orange-500 transition-colors">
            Sign In
          </Link>
        </div>

        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} Booklid. All rights reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;