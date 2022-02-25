import { useState , useContext } from "react";
import FirebaseContext from "../../context/firebase";
import PropTypes from "prop-types"
import UserContext from "../../context/user";
import { FieldValue } from "../../lib/firebase";

export default function AddComment({docId , comments , setComments , commentInput}){
    const [comment , setComment] = useState("");
    const {firebase , FieldValue } = useContext(FirebaseContext)
    const {user:{displayName}}=useContext(UserContext);


    const handleSubmitComment= (e) => {
        e.preventDefault();

        // give me  a new arary[]
        //put the new commment in there
        // and the old comments
        //then we have an new array with the new comment and the older comments
        setComments([...comments , {displayName , comment}])
        setComment("")

       return firebase
        .firestore()
        .collection("photos")
        .doc(docId)
        .update({
            comments:FieldValue.arrayUnion({displayName , comment})
        })
    }
    return (
        <div className="border-t border-gray-primary">
            <form
            className="flex justify-between pl-0 pr-5"
            method="POST"
            onSubmit={(e)=> comment.length>=1 ? handleSubmitComment(e) : e.preventDefault()}
            >
                <input 
                aria-label="Add a comment"
                autoComplete="off"
                type="text"
                className="text-sm text-gray-base w-full mr-3 py-5 px-4"
                placeholder="Add a comment..."
                name="add-comment"
                value={comment}
                onChange={(e)=>setComment(e.target.value)}
                ref={commentInput}
                
                />
                <button
                className={`text-sm font-bold text-blue-medium ${!comment && "opacity-25"}`}
                type="button"
                disabled={comment.length<1}
                onClick={handleSubmitComment}
                >Post</button>

            </form>
        </div>
    )
}
AddComment.propTypes={
    docId:PropTypes.string.isRequired,
    comments:PropTypes.array.isRequired,
    setComments:PropTypes.func.isRequired,
    commentInput:PropTypes.bool.isRequired
}