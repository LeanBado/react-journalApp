import { onAuthStateChanged } from "firebase/auth"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { FirebaseAuth } from "../firebase/config"
import { JournalRoutes } from "../journal/routes/JournalRoutes"
import { CheckingAuth } from "../ui/components/CheckingAuth"

export const AppRouter = () => {

const {status} = useSelector(state=> state.auth)

  if(status == "checking"){
    return <CheckingAuth></CheckingAuth>
  }

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async(user)=>{
      console.log
    })
  }, []);

  return (
    <Routes>

        {/* login y registro*/}
        <Route path="/auth/*" element={<AuthRoutes></AuthRoutes>}></Route>

        {/* journalApp */}
        <Route path="/*" element={<JournalRoutes></JournalRoutes>}></Route>

    </Routes>
  )
}
