import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchBookById } from '../services/bookService';
import { useAddToCart } from '../hooks/useAddToCart';

const SingleBook = () => {
  const { id } = useParams();
  const { addToCart, loadingBookId } = useAddToCart();

  const { data: book, isLoading, error } = useQuery({
    queryKey: ['book', id],
    queryFn: () => fetchBookById(id),
  });

  if (isLoading) return <div className="p-20 text-center">Loading book details...</div>;
  if (error) return <div className="p-20 text-center text-red-500">Error loading book.</div>;

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-24 py-16">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
        
        {/* Left: Book Cover */}
        <div className="w-full">
          <div className="bg-gray-100 rounded-3xl overflow-hidden shadow-xl aspect-2/3 flex items-center justify-center">
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right: Book Details */}
        <div className="flex flex-col">
          <div className="inline-block px-3 py-1 bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-widest rounded-full mb-4 w-max">
            {book.category}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2 leading-tight">
            {book.title}
          </h1>
          <p className="text-xl text-gray-500 mb-6 font-medium">{book.author}</p>
          
          <div className="flex items-center gap-4 mb-8">
            <span className="text-4xl font-bold text-gray-900">₦{book.price}</span>
            {book.oldPrice && (
              <span className="text-2xl text-gray-400 line-through">₦{book.oldPrice}</span>
            )}
          </div>

          <div className="prose prose-gray mb-10">
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">About the book</h4>
            <p className="text-gray-600 leading-relaxed text-lg">
              {book.description}
            </p>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => addToCart(book._id)}
              disabled={loadingBookId === book._id}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 cursor-pointer">
                {loadingBookId === book._id ? "Adding..." : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBook;