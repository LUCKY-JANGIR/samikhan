// app/profile/page.js (or pages/profile.js if using pages directory)
import { getServerSession } from "next-auth";
import Image from 'next/image';
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function page() {
    const session = await getServerSession(authOptions);
    // If there is no session, redirect to login or show an unauthorized message
    if (!session) {
        return(
            <>
            <h1>
                you are not loged in so please login first
            </h1>
            <Link href="/auth/signin">login</Link>
            </>
        )
  }

  return (
    <div>
      <h1>User Profile</h1>
      <div>
        <Image 
          src={session.user.image || '/default-avatar.png'} 
          alt="Profile Picture" 
          width={100} 
          height={100} 
        />
      </div>
      <p><strong>Name:</strong> {session.user.name}</p>
      <p><strong>Email:</strong> {session.user.email}</p>
      {session && session.user && session.user.role === 'admin' && (
        <div>
          <a href="/admin">Go to Admin Dashboard</a>
        </div>
      )}
    </div>
  );
}
