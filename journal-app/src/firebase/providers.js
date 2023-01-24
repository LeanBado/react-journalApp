import { async } from "@firebase/util";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";


const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
    prompt: 'select_account'
})
export const signInWithGoogle = async ()=>{

    try{

        const result = await signInWithPopup(FirebaseAuth,googleProvider)
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const {displayName, email, photoURL, uid} = result.user
       
        return {
            ok: true,
            displayName, 
            email, 
            photoURL, 
            uid
        }

    } catch(error){

        const errorCode = error.code
        const errorMessage = error.message

        return {
            ok: false,
            errorMessage
        }
    }
}

export const  registroUsuarioConEmailPw = async ({email, password, displayName}) => {

    try{
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
        console.log("provider",resp)
        const {uid, photoURL} = resp.user

       await updateProfile(FirebaseAuth.currentUser, {displayName})

        return {
            ok: true,
            displayName, 
            email, 
            photoURL, 
            uid
        }


    }  catch(error){
        console.log(error)
        return {ok: false, errorMessage: error.message}
    }
}