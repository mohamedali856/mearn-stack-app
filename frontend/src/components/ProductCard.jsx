import { useState } from "react";
import { useProductStore } from "../store/product";

export default function ProductCard({ product }) {
  const { deleteProduct, updateProduct } = useProductStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    name: product.name,
    price: product.price,
    image: product.image,
  });
  const [message, setMessage] = useState({ type: "", text: "" }); // State for success/error message

  const handleDeleteProduct = async (pid) => {
    try {
      const { success, message } = await deleteProduct(pid);
      if (success) {
        setMessage({ type: "success", text: "Product deleted successfully! 🗑️" });
      } else {
        setMessage({ type: "error", text: message || "Failed to delete product. ❌" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred. ❌" });
    }
    setTimeout(() => setMessage({ type: "", text: "" }), 3000); // Clear the message after 3 seconds
  };

  const handleUpdateProduct = async () => {
    try {
      const { success, message } = await updateProduct(product._id, editData);
      if (success) {
        setMessage({ type: "success", text: "Product updated successfully! 🎉" });
        closeModal();
      } else {
        setMessage({ type: "error", text: message || "Failed to update product. ❌" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred. ❌" });
    }
    setTimeout(() => setMessage({ type: "", text: "" }), 3000); // Clear the message after 3 seconds
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {/* Product Card */}
      <div className="w-[95%] mt-4 max-w-xs md:max-w-sm bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="h-64">
          <img
            className="w-full h-full object-cover"
            src={product.image}
            alt={product.name}
          />
        </div>
        <div className="p-4 flex flex-col justify-between h-48">
          <h2 className="text-base md:text-lg font-semibold text-gray-800 text-center">
            {product.name}
          </h2>
          <p className="text-sm md:text-base text-gray-600 mt-2 text-center">
            Price: <span className="font-medium text-blue-600">${product.price}</span>
          </p>
          <div className="mt-4 flex justify-between space-x-2">
            <button
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
              onClick={openModal}
            >
              Edit
            </button>
            <button
              className="flex-1 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
              onClick={() => handleDeleteProduct(product._id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Success/Error Message */}
      {message.text && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white text-center transition duration-500 ${
            message.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Edit Product</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-gray-700">Price</label>
                <input
                  type="number"
                  name="price"
                  value={editData.price}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-gray-700">Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={editData.image}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleUpdateProduct}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
