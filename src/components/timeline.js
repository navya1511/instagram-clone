import Skeleton from "react-loading-skeleton"
import UsePhotos from "../hooks/use-photos"
import Post from "./post";


export default function Timeline(){
  const {photos} = UsePhotos();
  //console.log("photos" , photos)
    //we need to get the logged in user's photos
    //on loading the photos , wwe need a  skeleton
    // if we have photos render them 
    // if the users has no photos , tell them to cfreate some
    return <div className="container col-span-2">
      {!photos ? (
        <>
        
          <Skeleton  count={4} width={640} height={600} className="mb-5" />
        
        
        </>
      ): photos?.length >0 ? (
        photos.map((content)=> (
          <Post key={content.docId} content={content} />
        ))
      ): (
        <p className="text-center text-2xl">Follow People to see photos</p>
      )
      }
        </div>
}