import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchBooks, deleteBook } from "../../services/bookService";
import DeleteConfirmModal from "../../components/admin/DeleteConfirmModal";
import { useNavigate } from "react-router-dom";

const AllProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [productToDelete, setProductToDelete] = useState(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate()

  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      setProductToDelete(null);
    },
  });

  const filteredProducts = products.filter((product) =>
    product.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  if (isLoading) return <p className="text-center py-20">Loading books...</p>;
  if (error) return <p className="text-center py-20 text-red-500">Failed to load books.</p>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          All Products
        </h1>

        <input
          type="text"
          placeholder="Search products..."
          className="px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-400 text-xs uppercase">
            <tr>
              <th className="px-6 py-4">Product Name</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Old Price</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {filteredProducts.map((product) => (
              <tr
                key={product._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 font-semibold text-gray-800">
                  {product.title}
                </td>

                <td className="px-6 py-4 font-medium text-gray-800">
                  ₦{product.price?.toLocaleString()}
                </td>
               
               <td className="px-6 py-4 font-medium text-gray-800">
                  ₦{product.oldPrice?.toLocaleString()}
                </td>
                
                <td className="px-6 py-4 font-medium text-gray-800">
                  {product.category}
                </td>

                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => navigate(`/admin/edit-product/${product._id}`)}
                    className="text-orange-500 hover:text-orange-600 text-sm font-medium mr-3 cursor-pointer">
                      Edit
                  </button>

                  <button 
                    onClick={() => {
                      console.log("clicked product:", product);
                      setProductToDelete(product);
                    }}
                    className="text-red-400 hover:text-red-500 text-sm font-medium cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filteredProducts.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-8 text-gray-500"
                >
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {productToDelete && (
          <DeleteConfirmModal
            isOpen={!!productToDelete}
            onClose={() => setProductToDelete(null)}
            onConfirm={() => deleteMutation.mutate(productToDelete._id)}
            title={productToDelete.title}
            isDeleting={deleteMutation.isPending}
          />
        )}
      </div>
    </div>
  );
};

export default AllProducts;