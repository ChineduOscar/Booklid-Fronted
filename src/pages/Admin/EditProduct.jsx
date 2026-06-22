import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchBookById, updateBook } from "../../services/bookService";
import { toast } from "react-toastify";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: book, isLoading, isError } = useQuery({
    queryKey: ["book", id],
    queryFn: () => fetchBookById(id),
    enabled: !!id,
  });

  // Mutation for update
  const mutation = useMutation({
    mutationFn: (data) => updateBook(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      queryClient.invalidateQueries({ queryKey: ["book", id] });
      toast.success("Product updated successfully");
      navigate("/admin/products");
    },
    onError: () => toast.error("Failed to update product"),
  });

  if (isLoading) {
    return <p className="text-center py-20">Loading product details...</p>;
  }

  if (isError || !book) {
    return (
      <p className="text-center py-20 text-red-500">Error loading product.</p>
    );
  }

  // Pass a key so the form remounts whenever book.id changes
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Edit Product</h1>

        <ProductForm
          key={book.id}
          initialData={book}
          onSubmit={(formData) =>
            mutation.mutate({
              ...formData,
              price: Number(formData.price),
              oldPrice: Number(formData.oldPrice),
            })
          }
          onCancel={() => navigate(-1)}
          isSubmitting={mutation.isLoading}
        />
      </div>
    </div>
  );
};

const ProductForm = ({ initialData, onSubmit, onCancel, isSubmitting }) => {
  // Initialize state from initialData only once (on mount)
  const [formData, setFormData] = useState(() => ({
    title: initialData?.title ?? "",
    author: initialData?.author ?? "",
    category: initialData?.category ?? "",
    price: initialData?.price ?? "",
    oldPrice: initialData?.oldPrice ?? "",
    description: initialData?.description ?? "",
    image: initialData?.image ?? "",
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6"
    >
      {/* Image */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Product Image URL
        </label>

        <input
          type="text"
          value={formData.image}
          className={inputClass}
          placeholder="https://example.com/image.jpg"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, image: e.target.value }))
          }
        />

        {formData.image && (
          <img
            src={formData.image}
            alt="preview"
            className="w-32 h-32 mt-4 object-cover rounded-xl border"
          />
        )}
      </div>

      {/* Title + Author */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Title</label>
          <input
            type="text"
            value={formData.title}
            className={inputClass}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Author</label>
          <input
            type="text"
            value={formData.author}
            className={inputClass}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, author: e.target.value }))
            }
          />
        </div>
      </div>

      {/* Price */}
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Price (₦)</label>
          <input
            type="number"
            value={formData.price}
            className={inputClass}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, price: e.target.value }))
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">
            Old Price (₦)
          </label>
          <input
            type="number"
            value={formData.oldPrice}
            className={inputClass}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, oldPrice: e.target.value }))
            }
          />
        </div>
      </div>

      {/* Category */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">Category</label>

        <select
          value={formData.category}
          className={inputClass}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, category: e.target.value }))
          }
        >
          <option value="">Select category</option>
          <option value="Novel">Novel</option>
          <option value="Non-Fiction">Non-Fiction</option>
          <option value="Short Stories">Short Stories</option>
          <option value="Essay">Essay</option>
        </select>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">Description</label>

        <textarea
          rows={4}
          value={formData.description}
          className={inputClass}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 px-4 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 disabled:opacity-50 cursor-pointer transition-colors"
        >
          {isSubmitting ? "Updating..." : "Update Product"}
        </button>
      </div>
    </form>
  );
};

export default EditProduct;