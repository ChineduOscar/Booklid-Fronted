import { useQuery } from "@tanstack/react-query";
import { fetchBooks } from "../../services/bookService";
import { useAddToCart } from "../../hooks/useAddToCart";

const Featured = () => {
  const { addToCart, loadingBookId } = useAddToCart();

  const { data, isLoading, error } = useQuery({
    queryKey: ['books'],
    queryFn: fetchBooks,
  });


  if (isLoading) return <p className="text-center mt-10">Loading featured books...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Failed to load books.</p>;

  const featuredBooks = data?.slice(0, 3) || [];

  const styles = [
    { label: "New Release", bg: "bg-[#41c34e]" },
    { label: "Best Book", bg: "bg-[#37418e]" },
    { label: "Top Rated", bg: "bg-orange-500" },
  ];

  return (
    <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {featuredBooks.map((book, index) => {
        const style = styles[index] || { label: "Featured", bg: "bg-gray-800" };

        return (
          <div
            key={book._id || book.title} // Use a unique ID from your data
            className={`flex items-center justify-between gap-4 rounded-2xl p-5 sm:p-6 ${style.bg}`}
          >
            <div className="space-y-3 flex-1">
              <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                {style.label}
              </h2>
              {/* Display dynamic title */}
              <p className="text-white/90 text-sm font-medium truncate">{book.title}</p>
              
              <button
                onClick={() => addToCart(book._id)}
                disabled={loadingBookId === book._id}
                className="w-fit bg-white text-black px-4 sm:px-5 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer">
                 {loadingBookId === book._id ? 'Adding...' : 'Add to cart'}
              </button>
            </div>
            
            <div className="w-24 h-32 sm:w-28 sm:h-36 shrink-0">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-full object-cover rounded-lg shadow-md"
                onError={(e) => { e.target.src = 'https://placehold.co/200x300/ffffff/999999?text=No+Cover' }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Featured