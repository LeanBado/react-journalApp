import { signInWithGoogle } from "../../firebase/providers"
import { checkingCredentials, login, logOut } from "./authSlice"

export const checkingAuthentication = () => {
    return async(dispatch) =>{
        dispatch(checkingCredentials())
    }
}

export const startGoogleAuth = () => {
    return async(dispatch) =>{
        dispatch(checkingCredentials())

        const result = await signInWithGoogle()
        console.log(result)
        if(!result.ok) return dispatch(logOut(result.errorMessage))
        
        dispatch(login(result))
    }
}