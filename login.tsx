import Image from 'next/image';
import 'react-toastify/dist/ReactToastify.css';
import Icon from '../utils/logo-transparent-svg.ccd037f9.svg';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';


const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Company', href: '#' },
  { name: 'FAQ', href: '#' },
];

const Login: React.FC = () => {
  const router = useRouter();
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLoginOrRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let endpoint = 'http://localhost:5000/login';
      
      if (isRegistering) {
        endpoint = 'http://localhost:5000/register'; 
        const res = await axios.post(endpoint, { publicKey, privateKey, role });
        if (res.status === 200 ) {
          toast.success("Registration Successful! Please Log In to continue");
        }
        else{
          throw new Error("Error in Registration")
        }
      }
      else {
        const res = await axios.post(endpoint, { publicKey, privateKey, role });
        console.log(res.data)
        if (res.status === 200 && res.data.role === 'admin' && privateKey.length === 66) {
          toast.success("Admin Login Successful");
          localStorage.setItem('role', 'admin');
          router.push('/indexy');
        } else if (res.status === 200 && res.data.role === 'user') {
          toast.success("User Login Successful");
          localStorage.setItem('role', 'user');
          router.push('/indexy2');
        } else {
          throw new Error('Failed to authenticate');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      if (!isRegistering) {
        toast.error("Error Something went wrong");
      }
    }
  };
  

  return (
    <>
    
      <header className="absolute inset-x-0 top-0 z-50 ">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link href={'/'}>
            <Image src={Icon} height={200} width={200} alt="Product Logo" />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
              <span className="sr-only">Open main menu</span>
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
                {item.name}
              </a>
            ))}
          </div>
        </nav>
      </header>
      <div className="flex min-h-full flex-1 flex-col justify-center lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-20">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {isRegistering ? 'Register an account' : 'Sign in to your account'}
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleLoginOrRegister}>
            {isRegistering && (
              <div>
                <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">
                  Select Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value as 'user' | 'admin')}
                  className="ml-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
            )}
            <div>
              <label htmlFor="publicKey" className="block text-sm font-medium leading-6 text-gray-900">
                Public Key
              </label>
              <div className="mt-2">
                <input
                  id="publicKey"
                  name="publicKey"
                  type="text"
                  style={{ paddingLeft: '10px' }}
                  onChange={(e) => setPublicKey(e.target.value)}
                  required
                  placeholder="Enter the public key (42 characters)"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="privateKey" className="block text-sm font-medium leading-6 text-gray-900">
                Private Key
              </label>
              <div className="mt-2">
                <input
                  id="privateKey"
                  name="privateKey"
                  type="text"
                  style={{ paddingLeft: '10px' }}
                  onChange={(e) => setPrivateKey(e.target.value)}
                  required
                  placeholder="Enter the private key (64 characters)"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isRegistering ? 'Register' : 'Sign in'} to Blockchain Network
              </button>
            </div>
            <div className="mt-4 text-center">
              <button
                type="button"
                className="text-indigo-600 hover:text-indigo-500 focus:outline-none"
                onClick={() => setIsRegistering(!isRegistering)}
              >
                {isRegistering ? 'Already have an account? Sign in' : "Don't have an account? Register"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;