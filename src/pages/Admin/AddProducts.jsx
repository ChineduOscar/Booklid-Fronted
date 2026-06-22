import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBook } from "../../services/bookService";
import { toast } from "react-toastify";

const AddProduct = () => {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    price: "",
    oldPrice: "",
    description: "",
    image: "",
  });

  const mutation = useMutation({
    mutationFn: createBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      toast.success("Product created successfully");
      setFormData({
        title: "",
        author: "",
        category: "",
        price: "",
        oldPrice: "",
        description: "",
        image: "",
      });
    },
    onError: () => {
      toast.error("Failed to create product");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      ...formData,
      price: Number(formData.price),
      oldPrice: Number(formData.oldPrice),
    });
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all";

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Add New Product</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6"
        >
          {/* Image URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Product Image URL</label>
            <input
              type="text"
              value={formData.image}
              className={inputClass}
              placeholder="https://example.com/image.jpg"
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            />
            {formData.image && (
              <img
                src={formData.image}
                alt="preview"
                className="w-32 h-32 mt-4 object-cover rounded-xl border border-gray-100"
              />
            )}
          </div>

          {/* Title and Author */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Title</label>
              <input
                type="text"
                value={formData.title}
                className={inputClass}
                placeholder="e.g. The Great Gatsby"
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Author</label>
              <input
                type="text"
                value={formData.author}
                className={inputClass}
                placeholder="e.g. F. Scott Fitzgerald"
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              />
            </div>
          </div>

          {/* Price and Old Price */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Price (₦)</label>
              <input
                type="number"
                value={formData.price}
                className={inputClass}
                placeholder="0.00"
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Old Price (₦)</label>
              <input
                type="number"
                value={formData.oldPrice}
                className={inputClass}
                placeholder="0.00"
                onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Category</label>
            <select
              value={formData.category}
              className={inputClass}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
              placeholder="Write a brief summary of the book..."
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="flex-1 px-4 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 disabled:opacity-50 cursor-pointer transition-colors"
            >
              {mutation.isPending ? "Saving..." : "Save Product"}
            </button>
          </div>

          {mutation.isError && (
            <p className="text-red-500 text-sm text-center">Failed to create product. Please try again.</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddProduct;