import useUser from "../../hooks/use-user"
import User from "./user"
import Suggestions from "./suggestions"



export default function Sidebar(){

  const {user :{docId , fullName , username , userId , following}} = useUser();
  
    //console.log("fullName , username , userId" , fullName , userName , userId , following , docId)

    
    return <div className="p-4">
      <User username={username} fullName={fullName}  />
      <Suggestions userId={userId} following={following} loggedInUserDocId={docId} />
    </div>
}