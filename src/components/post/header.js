import { Link } from "react-router-dom"
import PropTypes from "prop-types"


export default function Header({username}){
    return <div className="flex border-b  border-gray-primary h-8 p-4 py-8">
        <div className="flex items-center">
            <Link to={`/p/${username}`}  className="flex items-center">
             <img 
             src={`/images/avatars/${username}.jpg`}
             alt={`/p/${username} profile`}
             className="rounded-full h-8 w-8 mr-3"
             
             />
             <p className="font-bold">{username}</p>
            </Link>
        </div>

    </div>
}
Header.propTypes ={
    username:PropTypes.string.isRequired
}