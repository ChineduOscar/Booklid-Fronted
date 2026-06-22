import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import Cookies from 'js-cookie';
import { useQuery } from '@tanstack/react-query';
import { getCart } from '../services/cartService';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = !!Cookies.get('token');

  const { data: cartData } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
    enabled: isLoggedIn,
  });

  const totalQty =
    cartData?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <header className="border-b border-gray-200">
      <nav className="container mx-auto p-4 md:px-6 lg:px-24 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-800">
          Book<span className="text-orange-500">Lide</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/books" className="text-gray-800 hover:text-black font-semibold">
            Books
          </Link>

          {isLoggedIn ? (
            <Link
              to="/cart"
              className="relative text-white font-medium bg-orange-500 rounded-lg px-4 py-2 hover:bg-orange-600 flex items-center gap-2"
            >
              <ShoppingCart size={18} />
              Cart

              {totalQty > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                  {totalQty}
                </span>
              )}
            </Link>
          ) : (
            <Link
              to="/signin"
              className="text-white font-medium bg-orange-500 rounded-lg px-4 py-2 hover:bg-orange-600"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-600 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-50 p-4 flex flex-col gap-4">
          <Link
            to="/books"
            onClick={() => setIsOpen(false)}
            className="text-gray-700 font-medium"
          >
            Books
          </Link>

          {isLoggedIn ? (
            <Link
              to="/cart"
              onClick={() => setIsOpen(false)}
              className="text-white font-medium bg-orange-500 rounded-lg px-4 py-2 text-center flex items-center justify-center gap-2"
            >
              <ShoppingCart size={18} />
              Cart ({totalQty})
            </Link>
          ) : (
            <Link
              to="/signin"
              onClick={() => setIsOpen(false)}
              className="text-white font-medium bg-orange-500 rounded-lg px-4 py-2 text-center"
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;