import PropTypes from "prop-types"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { updateLoggedInFollowing , updateFollowedUsersFollowers} from "../../services/firebase";

export default function SuggestedProfile({ spDocId , username , profileId , userId , loggedInUserDocId}){
    const [followed , setFollowed]=useState(false)
    async function handleClick(){
        setFollowed(true);
        //firebase create 2 services (functions)
        //update the following array of the logged in user (my-profile)
        await updateLoggedInFollowing(loggedInUserDocId , profileId , false)
        await updateFollowedUsersFollowers(spDocId , userId , false)
        //update the followers of the profile user who has been followed 
    }

    return !followed ? (
        <div className="flex flex-row items-center align-items justify-between">
            <div className="flex items-center justify-between">
                <img 
                className="rounded-full object-cover w-8 h-8 flex mr-3 "
                src={`../images/avatars/${username}.jpg`}
                alt=""
                onError={(e)=> e.target.src="/images/avatars/default.png"}
                />
            <Link to={`/p/${username}`}>
                <p className="font-bold text-sm">{username}</p>
            </Link>
            </div>
            <button
             type="button"
             className="text-xs font-bold text-blue-medium"
             onClick={handleClick}
            >
                Follow
            </button>
        </div>
    ):null;
}

SuggestedProfile.propTypes={
    spDocId:PropTypes.string.isRequired,
    username:PropTypes.string.isRequired,
    profileId:PropTypes.string.isRequired,
    userId:PropTypes.string.isRequired,
    loggedInUserDocId:PropTypes.string.isRequired
}