import dbConnect from '@/lib/dbconnect';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  const { username, email, password } = await req.json();

  const { db } = await dbConnect();

  // Check if user already exists
  const existingUser = await db.collection('users').findOne({ email });
  if (existingUser) {
    return new Response(JSON.stringify({ success: false, message: 'User already exists' }), { status: 400 });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save the user to the database
  const user = await db.collection('users').insertOne({
    username,
    email,
    password: hashedPassword,
    role: 'user', // Default role
    createdAt: new Date(),
  });

  // Generate a JWT
  const token = jwt.sign(
    {
      id: user.insertedId,
      email: email,
      role: 'user',
    },
    process.env.JWT_SECRET, // Add JWT_SECRET in .env.local
    { expiresIn: '1h' } // Token expires in 1 hour
  );

  return new Response(JSON.stringify({
    success: true,
    message: 'User registered successfully',
    token, // Send the JWT back
  }), { status: 201 });
}
