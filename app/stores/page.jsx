// app/stores/page.js
"use client"
import { useEffect, useState } from "react";
import Storecards from "../_compnents/Storescard";

export default function StoresPage() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch("/api/stores"); // Fetch stores from your API
        const data = await response.json();
        setStores(data); // Set the stores data to state
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };

    fetchStores();
  }, []);

  return (
    <div>
      <h1>Stores</h1>
      <div className="stores-list">
        {stores.length > 0 ? (
          stores.map((store) => (
            
            <div className="container mx-auto w-[100vw] grid grid-row-4 grid-flow-col gap-2 mt-8">
              <Storecards image={store.image} name={store.name} description={store.description} id={store._id} category={store.category}/>
    </div>
          ))
        ) : (
          <p>No stores found.</p>
        )}
      </div>
    </div>
  );
}
