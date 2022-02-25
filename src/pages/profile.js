import { useState , useEffect } from "react";
import * as ROUTES from "../constants/routes"
import Header from "../components/header";
import { useNavigate, useParams } from "react-router-dom";
import { getUserByUserName } from "../services/firebase";
import UserProfile from "../components/profile/index"


export default function Profile(){
    const [user , setUser]=useState(null);
    //const [userExits , setUserExists]=useState(false)
    const { username } = useParams();
    //console.log(username)
    
    const history=useNavigate();

    useEffect(()=>{
        async function checkUserExits(){
            const [user] = await  getUserByUserName(username);
            //console.log(user);
            if(user?.userId){
                setUser(user);
            }
            else{
                history(ROUTES.NOT_FOUND)
            }
    
        }
       //console.log(user.userId)
        checkUserExits();
    },[username , history])


    return  user?.username ? (
    <div className="bg-gray-background">
         <Header />
    <div className="mx-auto max-w-screen-lg">
        <UserProfile user={user} />
        </div>    
        </div>
    ): null
    
}