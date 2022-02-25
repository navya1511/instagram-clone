import { useState, useContext , useEffect } from "react";
import UserContext from "../context/user";
import { getUserByUserId } from "../services/firebase";


export default function useUser(){
    const [activeUser , setActiveUser] = useState({});
    const  { user } = useContext(UserContext)
    


    useEffect(()=>{
        async function getUserObjByUserId(){
            //we need a function  that we call (firebase service)that gets the userdata based on the userid
        const [response] = await getUserByUserId(user.uid);
        setActiveUser(response);
        
        }
        if(user?.uid){
            getUserObjByUserId();
        }
    },[user])
    
    return { user : activeUser}
}