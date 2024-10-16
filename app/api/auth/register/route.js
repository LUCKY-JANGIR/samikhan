// app/api/register/route.js
import bcrypt from 'bcrypt';
import dbConnect from '@/lib/dbconnect'; // Your database connection logic
import user from '@/models/user';

export async function POST(request) {
  try {
    const { username, email, password } = await request.json();

    if (!username || !email || !password) {
      return new Response(JSON.stringify({ message: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    console.log("calling dbconnect in register route")
    await dbConnect();
    console.log("done")

    const emailExists = await user.findOne({ email });
    if (emailExists) {
      return new Response(JSON.stringify({ message: 'email already exists' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const userExists = await user.findOne({ email });
    if (userExists) {
      return new Response(JSON.stringify({ message: 'user already exists' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new user({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return new Response(JSON.stringify({ message: 'User registered successfully' }), {
      status: 201,
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
