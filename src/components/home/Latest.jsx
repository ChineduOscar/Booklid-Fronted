import { useQuery } from "@tanstack/react-query";
import { fetchBooks } from "../../services/bookService";
import { Link } from "react-router-dom";
import { useAddToCart } from "../../hooks/useAddToCart";

const Latest = () => {
  const { addToCart, loadingBookId } = useAddToCart()
  const { data, isLoading, error } = useQuery({
    queryKey: ['books'],
    queryFn: fetchBooks,
  });

  if (isLoading) return <p className="text-center mt-10">Loading latest arrivals...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Failed to load books.</p>;

  return (
    <section className="mt-20">
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Latest <span className="text-orange-500">Arrivals</span>
        </h2>
        <a href="/books" className="text-xs font-bold uppercase tracking-wider text-orange-500 border-b border-orange-500 pb-0.5">
          View all books
        </a>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {data?.map((book) => (
          <div
            key={book._id}
            className="bg-white rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-sm transition-all duration-200 cursor-pointer flex sm:flex-col"
          >
            {/* Cover */}
            <div className="relative w-28 sm:w-full h-40 sm:h-56 shrink-0 bg-gray-100">
              {book.category && (
                <span className="absolute top-2.5 left-2.5 z-10 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-orange-500 text-white">
                  {book.category}
                </span>
              )}
              <Link to={`/book/${book._id}`}>
                <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = 'https://placehold.co/300x450/f3f4f6/9ca3af?text=No+Cover' }}
                  />
                </Link>
            </div>

            {/* Info */}
            <div className="p-3 flex flex-col justify-between flex-1">
              <div>
                <p className="text-[13px] font-semibold text-gray-800 leading-snug line-clamp-2 mb-1">
                  {book.title}
                </p>
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
                  className="bg-orange-500 hover:bg-orange-600 text-white text-[10px] font-semibold uppercase tracking-wide px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer">
                  {loadingBookId === book._id ? "Adding..." : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Latest;