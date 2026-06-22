import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { fetchBooks } from "../services/bookService";
import { Link } from 'react-router-dom';
import { useAddToCart } from '../hooks/useAddToCart';

const Books = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Default');
  const { addToCart, loadingBookId } = useAddToCart();

  const { data: allBooks, isLoading, error } = useQuery({
    queryKey: ['books'],
    queryFn: fetchBooks,
  });

  const categories = ["All", ...new Set(allBooks?.map((b) => b.category).filter(Boolean))];

  const sortOptions = ["Default", "Price: Low to High", "Price: High to Low", "Name: A-Z"];

  if (isLoading) return <p className="text-center py-20">Loading books...</p>;
  if (error) return <p className="text-center py-20 text-red-500">Failed to load books.</p>;

  const filtered = allBooks
    ?.filter((book) => {
      const matchesSearch = book.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === 'All' || book.category === activeCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'Price: Low to High') return a.price - b.price;
      if (sortBy === 'Price: High to Low') return b.price - a.price;
      if (sortBy === 'Name: A-Z') return a.title.localeCompare(b.title);
      return 0;
    });

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-24 py-12">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
          All <span className="text-orange-500">Books</span>
        </h1>
        <p className="text-gray-500 text-sm">
          Showing {filtered?.length || 0} of {allBooks?.length || 0} books
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg py-2.5 px-4 text-sm"
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm cursor-pointer">
          {sortOptions.map((opt) => <option key={opt}>{opt}</option>)}
        </select>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 flex-wrap mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase ${
              activeCategory === cat ? 'bg-orange-500 text-white' : 'bg-white border border-gray-200 hover:text-orange-500'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {filtered?.map((book) => (
          <div key={book._id} className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all flex sm:flex-col">
            <div className="relative w-28 sm:w-full h-40 sm:h-56 shrink-0 bg-gray-100">
              {book.category && (
                <span className="absolute top-2.5 left-2.5 z-10 text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-orange-500 text-white">
                  {book.category}
                </span>
              )}
              <Link to={`/book/${book._id}`} >
                <img 
                  src={book.image} 
                  alt={book.title} 
                  className="w-full h-full object-cover" 
                  onError={(e) => { e.target.src = 'https://placehold.co/300x450/f3f4f6/9ca3af?text=No+Cover'; }}
                  />
              </Link>
            </div>
            
            <div className="p-3 flex flex-col justify-between flex-1">
              <div>
                <p className="text-[13px] font-semibold text-gray-800 line-clamp-2">{book.title}</p>
                <p className="text-[11px] text-gray-400 mb-3">{book.author}</p>
              </div>
              
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-orange-500 font-bold text-sm">₦{book.price}</span>
                  {book.oldPrice && (
                    <span className="text-gray-300 text-[11px] line-through">₦{book.oldPrice}</span>
                  )}
                </div>
                <button
                  onClick={() => addToCart(book._id)}
                  disabled={loadingBookId === book._id}
                  className="bg-orange-500 hover:bg-orange-600 text-white text-[10px] font-semibold uppercase tracking-wide px-3 py-1.5 rounded-lg transition-colors cursor-pointer">
                    {loadingBookId === book._id ? "Adding..." : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;