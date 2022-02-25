import React, { useContext, useEffect, useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes"
import { doesUsernameExist } from "../services/firebase"


export default function SignUp(){
    const history = useNavigate();
    const { firebase } = useContext(FirebaseContext);

    const [username , setuserName]=useState('');
    const [fullName , setFullName]=useState('');
    const [emailAddress , setEmailAdddress]=useState('');
    const [password , setPassword]=useState('');

    const [error , setError]=useState('');
    const isInValid = password=== '' || emailAddress===''

    async function handleSignup(e){
        e.preventDefault();

        const userNameExists = await doesUsernameExist(username);
        console.log(userNameExists)
        if(userNameExists.length===0){
            try {
                const  createdUserResult = await firebase
                .auth()
                .createUserWithEmailAndPassword(emailAddress , password );

                await createdUserResult.user.updateProfile({
                    displayName:username
                })

                await firebase.firestore().collection("users").add({
                    userId:createdUserResult.user.uid,
                    username: username.toLowerCase(),
                    fullName,
                    emailAddress:emailAddress.toLowerCase(),
                    following: [],
                    followers:[],
                    dateCreated:Date.now()
                })

                history(ROUTES.DASHBOARD);
            } catch (error) {
                setFullName('')
                setEmailAdddress('')
                setPassword("")
                setError(error.message)
            }
        }
        else{
         setuserName('')
         setError("That username is already taken , please try another.")
        }

    };

    useEffect(()=>{
        document.title = "Sign Up- Instagram"
    },[])

    return(
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


        <form onSubmit={handleSignup}>
            <input 
            aria-label='Enter your username'
            type="text"
            placeholder='Username'
            className='text-sm text-gray base w-full mr-3 py-5 px-4 h-2 border 
            border-gray-primary rounded mb-2'
            value={username}
            onChange={(e)=>setuserName(e.target.value)}
            
            />
            <input 
            aria-label='Enter your full Name'
            type="text"
            placeholder='Full Name'
            className='text-sm text-gray base w-full mr-3 py-5 px-4 h-2 border 
            border-gray-primary rounded mb-2'
            value={fullName}
            onChange={(e)=>setFullName(e.target.value)}
            
            />
            
            <input 
            aria-label='Enter your Email Address'
            type="text"
            placeholder='Email Address'
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
             Sign Up
            </button>
        </form>
        </div>
     
     <div className='flex justify-center flex-col items-center w-full bg-white p-4 rounded border
            border-gray-primary'>
                <p className='text-sm'>
                    Have an account?{' '}
                    <Link to={ROUTES.LOGIN} className="text-bold text-blue-medium">
                       Log In
                    </Link>
                </p>
            </div>
            </div>
    </div>
    )

}