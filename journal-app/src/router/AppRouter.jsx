import { onAuthStateChanged } from "firebase/auth"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { FirebaseAuth } from "../firebase/config"
import { JournalRoutes } from "../journal/routes/JournalRoutes"
import { login, logOut } from "../store/auth/authSlice"
import { CheckingAuth } from "../ui/components/CheckingAuth"

export const AppRouter = () => {

const {status} = useSelector(state=> state.auth)
const dispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async(user)=>{
      if(!user) return dispatch(logOut())

      const {uid, email, displayName, photoURL} = user
      
      dispatch(login({uid, email, displayName, photoURL}))

    })
  }, []);


  if(status == "checking"){
    return <CheckingAuth></CheckingAuth>
  }

  return (
    <Routes>
        {(status == "authenticated")
        ?// login y registro
        <Route path="/auth/*" element={<AuthRoutes></AuthRoutes>}></Route>
        : //journalApp
        <Route path="/*" element={<JournalRoutes></JournalRoutes>}></Route>
        }
        <Route path="/*" element={ <Navigate to="auth/login"></Navigate>}></Route>
        

        
    </Routes>
  )
}
