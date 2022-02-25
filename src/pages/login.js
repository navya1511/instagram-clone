import React , { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from "../constants/routes"


export default function Login(){

    const history = useNavigate()
   const { firebase } = useContext(FirebaseContext);

   const [emailAddress , setEmailAdddress]= useState('');
   const [password , setPassword] = useState('');

   const [error , setError ]= useState('');
   const isInValid = password === '' || emailAddress === '';

   const handleLogin= async (e)=>{
       e.preventDefault();
       try {
           await firebase.auth().signInWithEmailAndPassword(emailAddress , password);
           history(ROUTES.DASHBOARD)
       } catch (error) {
           setEmailAdddress('')
           setPassword('')
           setError(error.message)
       }
   }

   useEffect(()=>{
       document.title= 'Login - Instagram';

   },[])
   
    return (
    <div className='container flex mx-auto max-w-screen-md items-center h-screen '>
        <div className='flex w-3/5'>
            <img src="/images/iphone-image.jpg" alt="iphone-profile" />
        </div>
     <div className='flex flex-col w-2/5'>
         <div className='flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded'>
         <h1 className='flex justify-center w-full'>
             <img src="/images/users/logo.png" alt="instagram" className='mt-2 w-6/12 mb-4' />
         </h1>
        {error && <p className='mb-4 text-xs text-red-primary'>{error}</p>}


        <form onSubmit={handleLogin} method="POST">
            <input 
            aria-label='Enter your email address'
            type="text"
            placeholder='Email address'
            className='text-sm text-gray base w-full mr-3 py-5 px-4 h-2 border 
            border-gray-primary rounded mb-2'
            value={emailAddress}
            onChange={(e)=>setEmailAdddress(e.target.value)}
            
            />
            <input 
            aria-label='Enter your password'
            type="password"
            placeholder='Password'
            className='text-sm text-gray base w-full mr-3 py-5 px-4 h-2 border 
            border-gray-primary rounded mb-2'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            
            />
            <button 
             disabled={isInValid}
             type="submit"
             className= {`bg-blue-medium text-white w-full rounded h-8 font-bold ${isInValid && "opacity-50"}`}
            >
                Log In
            </button>
        </form>
        </div>
     
     <div className='flex justify-center flex-col items-center w-full bg-white p-4 rounded border
            border-gray-primary'>
                <p className='text-sm'>
                    Don't you have an account?{' '}
                    <Link to={ROUTES.SIGN_UP} className="text-bold text-blue-medium">
                        Sign up
                    </Link>
                </p>
            </div>
            </div>
    </div>
    )
}
