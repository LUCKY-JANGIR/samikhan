import dbConnect from "@/lib/dbconnect";
import user from "@/models/user";
import bcrypt from "bcrypt"
import  JWT from "jsonwebtoken";


export async function POST(request) {
   const JWT_SECRET = process.env.JWT_SECRET
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
    const isMatch = await bcrypt.compare(password,userExists.password);  // Compare entered password with hashed password
    console.log("getting errorwhile !ismatch")
      if (!isMatch) {
        return new Response(JSON.stringify({ message: 'Invalid password' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });

      }
      const token = JWT.sign(
        { id: userExists._id, email: userExists.email,role:userExists.role },
        JWT_SECRET,
        { expiresIn: '1h' }
      );
  
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
