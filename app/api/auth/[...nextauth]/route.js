import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google"; // Import Google Provider
import CredentialsProvider from "next-auth/providers/credentials";
import User from '@/models/user'; // Adjust the path as necessary
import connectToDatabase from '@/lib/dbconnect'; // Adjust the path as necessary
// import bcrypt from 'bcrypt'; // For password hashing

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({ // Add Google provider
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await connectToDatabase();
        const user = await User.findOne({ username: credentials.username });

        if (user && user.password === credentials.password) {
          return {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            name: user.name,
            image: user.image,
          };
        }

        throw new Error("Invalid username or password");
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signin',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user }) {
      // If user is coming from an external provider, save their info in the database
      if (user) {
        await connectToDatabase();

        // Check if the user already exists in the database
        const dbUser = await User.findOne({ email: user.email });
        if (!dbUser) {
          // If user does not exist, create a new user
          const newUser = new User({
            username: user.name || user.login, // Use name or login for username
            email: user.email,
            role: null, // Default role for external users
            image: user.image || null,
          });
          await newUser.save();
          token.sub = newUser._id; // Set user ID in token
          token.role = newUser.role; // Set user role in token
        } else {
          token.sub = dbUser._id; // Set user ID in token if user already exists
          token.role = dbUser.role; // Set user role in token
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.sub; // Set user ID in session
      session.user.role = token.role; // Set user role in session
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
