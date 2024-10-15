import dbConnect from '@/lib/dbconnect';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  const { email, password } = await req.json();

  const { db } = await dbConnect();

  // Find the user by email
  const user = await db.collection('users').findOne({ email });
  if (!user) {
    return new Response(JSON.stringify({ success: false, message: 'Invalid credentials' }), { status: 401 });
  }

  // Compare the password
  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    return new Response(JSON.stringify({ success: false, message: 'Invalid credentials' }), { status: 401 });
  }

  // Generate JWT
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET, 
    { expiresIn: '1h' }
  );

  return new Response(JSON.stringify({
    success: true,
    token,
  }), { status: 200 });
}
