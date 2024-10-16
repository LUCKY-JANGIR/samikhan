import dbConnect from "@/lib/dbconnect";
import user from "@/models/user";
import bcrypt from "bcrypt"

export async function POST(request) {
  try {
    const {  email, password } = await request.json();
    console.log(email,password)
    if (!email || !password) {
      return new Response(JSON.stringify({ message: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await dbConnect();

    const userExists = await user.findOne({ email });
    if (!userExists) {
      return new Response(JSON.stringify({ message: 'Invalid emails' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    console.log("User password (hashed):", userExists.password); // Should be hashed
    console.log("Entered password:", password);
    const isMatch = await bcrypt.compare(password,userExists.password);  // Compare entered password with hashed password
      if (!isMatch) {
        return new Response(JSON.stringify({ message: 'Invalid password' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });

      }
      return new Response(JSON.stringify({ message: 'user found' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'An error occurred' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
