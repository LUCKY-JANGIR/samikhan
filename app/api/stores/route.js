// app/api/stores/route.js
import dbConnect from "@/lib/dbconnect";
import { NextResponse } from "@/models/node_modules/next/server";
import Store from "@/models/store"; // Import the Store model
export async function GET() {
  try {
    await dbConnect(); // Connect to MongoDB
    const stores = await Store.find({}); // Fetch all stores
    return NextResponse.json(stores); // Send the stores data as JSON
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch stores" }, { status: 500 });
  }
}
 