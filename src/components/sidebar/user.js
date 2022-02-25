import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import Skeleton from "react-loading-skeleton"
import { memo } from "react"



export default function User({username , fullName}){
    return !username || !fullName ? (
        <Skeleton count={1} height={61} />
    ) : (
        <Link to={`/p/${username}`} className="grid grid-cols-4 gap-4 mb-6 items-centwe">
            <div className="flex items-center justify-between col-apan-1">
            <img
            src={`/images/avatars/${username}.jpg`}
            className="rounded-full   object-cover h-16 w-16  flex mr-3 "
            alt={`${username} profile`}
            onError={(e)=>e.target.src="/images/avatars/default.png"}
            />
            </div>
            <div className="col-span-3 mt-2">
                <p className="font-bold text-sm">{username}</p>
                <p className="text-sm">{fullName}</p>
            </div>
        </Link>
    )
}

User.propTypes={
    username: PropTypes.string,
    fullName: PropTypes.string
}