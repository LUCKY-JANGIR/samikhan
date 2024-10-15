// app/stores/category/page.js
"use client"
import { useEffect, useState } from "react";
import { useRouter } from "@/models/node_modules/next/navigation";
import { usePathname } from '@/models/node_modules/next/navigation'
import Cards from "@/app/_compnents/Cards"; 
export default function CategoryPage() {
  const router = useRouter();
let pathname = usePathname()

  const category= pathname.split('/')[2]
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await fetch(`/api/products?category=${category}`,
);
         
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        setProducts(data); // Set the products data
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProductsByCategory(); // Fetch products on page load
  }, [category]);

  return (
    <div> 
      <h1>Products in {category}</h1>
      <div className="products-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="product-card">
              <Cards url={product._id} name={product.name} description={product.description} price={product.price} image={product.image}/>
              
            </div>
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
}



