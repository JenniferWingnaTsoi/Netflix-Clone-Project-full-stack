import axios from 'axios';
import { useCallback, useState } from 'react';
import { NextPageContext } from 'next';
import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

import Input from '@/pages/Input';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

const Auth = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [variant, setVariant] = useState('login');

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login');
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/'
      });

      router.push('/profiles');
    } catch (error) {
      console.log(error);
    }
  }, [email, password, router]);

  const register = useCallback(async () => {
    try {
      await axios.post('/api/register', {
        email,
        name,
        password
      });

      login();
    } catch (error) {
        console.log(error);
    }
  }, [email, name, password, login]);


  //styles
  const loginBg:string = "relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover"
  const bgShadow:string = "bg-black w-full h-full lg:bg-opacity-50"
  const navBar:string ="px-12 py-5"
  const signInBox:string = "flex justify-center"
  const signInBoxbgShadow:string = "bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full"
  const signInTitle:string = "text-white text-4xl mb-8 font-semibold"
  const inputBox:string="flex flex-col gap-4"
  const loginButton:string = "bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
  const otherLoginBox:string ="flex flex-row items-center gap-4 mt-8 justify-center"
  const googleGithubLogo:string = "w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
  const createAccount:string = "text-white ml-1 hover:underline cursor-pointer"
  
  return (
    <div className={loginBg}>
      <div className={bgShadow}>
        <nav className={navBar}>
          <img src="/images/logo.png" className="h-12" alt="Logo" />
        </nav>
        <div className={signInBox}>
          <div className={signInBoxbgShadow}>
            <h2 className={signInTitle}>
              {variant === 'login' ? 'Sign in' : 'Register'}
            </h2>
            <div className={inputBox}>
              {variant === 'register' && (
                <Input
                  id="name"
                  type="text"
                  label="Username"
                  value={name}
                  onChange={(e: any) => setName(e.target.value)} 
                />
              )}
              <Input
                id="email"
                type="email"
                label="Email address or phone number"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)} 
              />
              <Input
                type="password" 
                id="password" 
                label="Password" 
                value={password}
                onChange={(e: any) => setPassword(e.target.value)} 
              />
            </div>
            <button onClick={variant === 'login' ? login : register} className={loginButton}>
              {variant === 'login' ? 'Login' : 'Sign up'}
            </button>
            <div className={otherLoginBox}>
              <div onClick={() => signIn('google', { callbackUrl: '/profiles' })} className={googleGithubLogo}>
                <FcGoogle size={32} />
              </div>
              <div onClick={() => signIn('github', { callbackUrl: '/profiles' })} className={googleGithubLogo}>
                <FaGithub size={32} />
              </div>
            </div>
            <p className="text-neutral-500 mt-12">
              {variant === 'login' ? 'First time using Netflix?' : 'Already have an account?'}
              <span onClick={toggleVariant} className={createAccount}>
                {variant === 'login' ? 'Create an account' : 'Login'}
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
