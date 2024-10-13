'use client'
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect,useState } from 'react';
export default function SignIn ({ providers })  { 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      if (session.user.role === 'admin') {
        router.push("/admin");  // Redirect admin to the admin page
      } else {
        router.push("/profile");  // Redirect regular user to the profile page
      }
    }
  }, [session, router]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await signIn('credentials', {
      redirect: false, // Prevent redirection
      username, // Pass username
      password  // Pass password
    });

    if (result.ok) {
      router.push("/profile")
    } else {
      console.log("wrong id pass") 
    }
  };

  return(
    <>
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit">Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
    <div>
    <button onClick={() => signIn('github')}>Sign in with GitHub</button>
  </div>
    
    </>)
}


