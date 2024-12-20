
import { GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { auth } from "../../firebase.config";

// signup using google
export async function withGoogle() {

    const provider = new GoogleAuthProvider();
        
    const result = await signInWithPopup(auth, provider);
    let user = result.user;
    let profilePicUrl = user.photoURL;
    const highQualityProfilePicUrl = profilePicUrl?.replace(/s\d+-c/, "s512-c");
    profilePicUrl = highQualityProfilePicUrl;
  
    // update server profile
    await updateProfile(user, {
        photoURL: profilePicUrl,
    });
    const username = user.email.split("@")[0];
    user = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: profilePicUrl,
        token: user.accessToken,
        username,
    };

    return user;
        
        
}