import { Link } from "react-router-dom"
import { useProductStore } from "../store/product"
import { useEffect } from "react";
import ProductCard from "../components/ProductCard";
export default function HomePage(){
    const {fetchProducts,products} = useProductStore();
    useEffect(()=>{
        fetchProducts();
    }, [fetchProducts]);
    console.log("products",products)
    return (
        <>
        <div className="flex flex-col justify-center items-center font-thin text-lg">
            <div>
                <h1>Current Products</h1>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 w-[90%] mx-auto gap-4">
                {products.map((product) =>(
                    <ProductCard key={product._id} product={product}/>
                ))}
            </div>
            {products.length === 0 && (
                            <div className="flex gap-2">
                            <h1>No products found</h1>
                            <Link to="/create" className="underline text-blue-700">Add a new product</Link>
                        </div>
            )}
        </div>
        </>
    )
}