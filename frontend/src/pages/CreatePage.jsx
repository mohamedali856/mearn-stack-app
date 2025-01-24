import { useState } from "react";
import { useProductStore } from "../store/product";

export default function CreatePage() {
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: "",
    });
    const [successMessage, setSuccessMessage] = useState(""); // State to hold the success message
    const { createProduct } = useProductStore();

    const handleAddProduct = async () => {
        const { success, message } = await createProduct(newProduct);
        if (success) {
            setSuccessMessage("Product created successfully! 🎉"); // Set success message
            setTimeout(() => setSuccessMessage(""), 3000); // Hide the message after 3 seconds
        } else {
            setSuccessMessage(`Error: ${message}`); // Display error message if any
        }
    };

    return (
        <>
            <div className="flex-col flex items-center justify-center">
                <div>
                    <h1 className="font-thin">Create New Product</h1>
                </div>
                <div className="flex flex-col items-center justify-center gap-4 mt-4">
                    <input
                        type="text"
                        placeholder="Product Name"
                        name="name"
                        value={newProduct.name}
                        onChange={(e) =>
                            setNewProduct({ ...newProduct, name: e.target.value })
                        }
                        className="border py-2 px-4 font-thin"
                    />
                    <input
                        type="text"
                        placeholder="Product Price"
                        name="price"
                        value={newProduct.price}
                        onChange={(e) =>
                            setNewProduct({ ...newProduct, price: e.target.value })
                        }
                        className="border py-2 px-4 font-thin"
                    />
                    <input
                        type="text"
                        placeholder="Product Image URL"
                        name="image"
                        value={newProduct.image}
                        onChange={(e) =>
                            setNewProduct({ ...newProduct, image: e.target.value })
                        }
                        className="border py-2 px-4 font-thin"
                    />
                    <button
                        onClick={handleAddProduct}
                        className="bg-black text-white font-thin px-4 py-2"
                    >
                        Add Product
                    </button>
                </div>
                {successMessage && (
                    <div className="mt-4 bg-green-100 text-green-700 border border-green-400 rounded-md px-4 py-2">
                        {successMessage}
                    </div>
                )}
            </div>
        </>
    );
}
