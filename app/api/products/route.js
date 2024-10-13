import dbConnect from '@/lib/dbconnect';
import Product from '@/models/product';

export async function GET(req) {
  await dbConnect();

  try {
    // Check if a query parameter is provided
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id'); // Get the id query parameter
    const category = searchParams.get('category'); // Get the category query parameter

    let products;

    if (id) {
      // If an ID is provided, find the product by ID
      products = await Product.findById(id);
      if (!products) {
        return new Response(JSON.stringify({ message: "Product not found" }), { status: 404 });
      }
    } else if (category) {
      // If a category is provided, filter products by category
      products = await Product.find({ category });
      if (products.length === 0) {
        return new Response(JSON.stringify({ message: "No products found in this category" }), { status: 404 });
      }
    } else {
      // If no query parameters are provided, return all products
      products = await Product.find({});
    }

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Server error", error }), { status: 500 });
  }
}
