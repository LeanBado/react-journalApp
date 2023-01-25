import { loginWIthEmailPassword, registroUsuarioConEmailPw, signInWithGoogle } from "../../firebase/providers"
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

export const startCreatingUserWithEmailPw = ({email, password, displayName}) => {
    return async(dispatch)=>{

        dispatch(checkingCredentials())
        const {ok, uid, photoURL, errorMessage} = await registroUsuarioConEmailPw({email, password, displayName})
        

        if(!ok) return dispatch (logOut({errorMessage})) //el payload en el logOut es un objeto, asique hay que pasar el errorMessage como tal
    
        dispatch(login({uid, displayName, email, photoURL}))
    }
}

export const startLoginWIthEmailPassword = ({email, password, displayName}) => {
    return async (dispatch) =>{

        dispatch(checkingCredentials())
        const {ok, photoURL, uid, errorMessage, displayName} = await loginWIthEmailPassword({email, password})

        if(!ok) return dispatch (logOut({errorMessage}))

        dispatch(login({uid, displayName, email, photoURL}))
    }
}