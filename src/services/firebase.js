
import { FieldValue, firebase } from '../lib/firebase'


export async function doesUsernameExist(username){
    const result = await firebase
    .firestore()
    .collection('users')
    .where('username' , '==' , username)
    .get();

    console.log(result)
    return result.docs.map((user)=>user.data().length > 0)




}

// get user from the firestore where userId === userId (passed from the auth)

export async function getUserByUserId(userId){
    const result = await firebase.firestore().collection('users').where('userId' , "==" , userId).get();
   
    const user = result.docs.map((item)=>({
        ...item.data(),
        docId: item.id
    }))
    
    return user;

}
export async function getUserByUserName(username){
    const result = await firebase
    .firestore()
    .collection('users')
    .where('username' , "==" , username)
    .get();
   
    const user = result.docs.map((item)=>({
        ...item.data(),
        docId: item.id
    }))
    //console.log(user);
    return user;

}


export async function getSuggestedProfiles(userId , following){
    let query =  firebase.firestore().collection('users')
    //if we have following
    if(following.length > 0){
        query = query.where("userId" , "not-in" , [...following , userId]) //there should be following 
        //whose userId not in following
    }
    else{
        query = query.where("userId" , "!=" , userId) //there should every userId except its own
    }
    const result = await query.limit(10).get();
    const profiles = result.docs.map((item)=>({
        ...item.data(),
        docId: item.id
    }))
    
    return profiles;

}
export async function updateLoggedInFollowing(
    loggedInUserDocId , //currently logged in user document is
     profileId      // the user that loggedIn user requests to follow
     , isFollowingProfile   //true/false (is user following that pserson)
     ){
    return firebase
    .firestore()
    .collection("users")
    .doc(loggedInUserDocId)
    .update({
       following: isFollowingProfile
       ? FieldValue.arrayRemove(profileId)
       : FieldValue.arrayUnion(profileId)
    })

}

export async function updateFollowedUsersFollowers(
    spDocId,  //profile doc id which is to follow
    loggedInUserDocId, //the person who requests to follow
    isFollowingProfile
)
{
    return firebase
    .firestore()
    .collection("users")
    .doc(spDocId)
    .update({
       followers: isFollowingProfile
       ? FieldValue.arrayRemove(loggedInUserDocId)
       : FieldValue.arrayUnion(loggedInUserDocId)
    })
}
export async function getPhotos(userId , following){
    const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId" ,"in" , following)
    .get();

    
    const userFollowedPhotos = result.docs.map((photo)=>({
        ...photo.data() ,
        docId: photo.id
    }));
    
    

    const photosWithUserDetails= await Promise.all(
        userFollowedPhotos.map(async (photo)=>{
            let userLikedPhoto =false;
            if(photo.likes.includes(userId)){
                userLikedPhoto=true;
            }
            const user= await getUserByUserId(photo.userId);
            const { username } =user[0];

            return {username , ...photo , userLikedPhoto}
        })
    )
    return photosWithUserDetails;
}
export async function getUserPhotosByUserId(userId){
    const result = await firebase.firestore().collection('photos').where('userId' , "==" , userId).get();
   
    const photos = result.docs.map((photo)=>({
        ...photo.data(),
        docId: photo.id
    }))
    
    return photos;

}

// export async function isUserFollowingProfile(loggedInUserName , profileUserId){
//     const result = await firebase
//     .firestore()
//     .collection('users')
//     .where('userName' , '==' , loggedInUserName)
//     .where('following' , 'array-contains' , profileUserId)
//     .get();

//     const [response={}] = result.docs.map((item)=>({
//         ...item.data(),
//         docId: item.id
//     }))

//     console.log("response" , response)

//     return response.userId
    


// }

export async function isUserFollowingProfile(loggedInUserUsername, profileUserId) {
    const result = await firebase
      .firestore()
      .collection('users')
      .where('username', '==', loggedInUserUsername) // karl (active logged in user)
      .where('following', 'array-contains', profileUserId)
      .get();
  
    const [response = {}] = result.docs.map((item) => ({
      ...item.data(),
      docId: item.id
    }));

    //console.log("res" , response)
  
    return response.userId;
  }

  export async function toggleFollow(isFollowingProfile, activeUserdocId, profileDocId, 
    profileUserId, followinguserId){
      await updateFollowedUsersFollowers(profileDocId , followinguserId , isFollowingProfile);
      await updateLoggedInFollowing(activeUserdocId , profileUserId , isFollowingProfile);
  }