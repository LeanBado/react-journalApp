import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { useCheckAuth } from "../hooks/useCheckAuth"
import { JournalRoutes } from "../journal/routes/JournalRoutes"
import { CheckingAuth } from "../ui/components/CheckingAuth"

export const AppRouter = () => {

  const { status} = useCheckAuth()


  if(status == "checking"){
    return <CheckingAuth></CheckingAuth>
  }

  return (
    <Routes>
        {(status == "authenticated")
        ?// login y registro
        <Route path="/*" element={<JournalRoutes></JournalRoutes>}></Route>
        : //journalApp
        <Route path="/auth/*" element={<AuthRoutes></AuthRoutes>}></Route>
        }
        <Route path="/*" element={ <Navigate to="auth/login"></Navigate>}></Route>
        

        
    </Routes>
  )
}
