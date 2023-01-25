import { Link as ReactLink } from "react-router-dom"
import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks/useForm"
import { checkingAuthentication, startGoogleAuth, startLoginWIthEmailPassword } from "../../store/auth/thunks"
import { useDispatch, useSelector } from "react-redux"
import { useMemo } from "react"

export const LoginPage = () => {

  const {email, password, onInputChange, formState} = useForm({
    email: "leandro@gmail.com",
    password: "1234",
  })
  const dispatch = useDispatch()
  const {status, errorMessage} = useSelector(state => state.auth)
  const statusValidator = useMemo(() => status == "checking", [status])
  
 
  const onSubmit =(event) =>{
      event.preventDefault()
    
      dispatch (startLoginWIthEmailPassword(formState))
  }

  const onGoogleLog= () => {
    console.log("googleLog")
    dispatch(startGoogleAuth())
  }

  return (
    <AuthLayout title="Login!">

      <form onSubmit={onSubmit}>

        <Grid container
        display="block">
          <Grid item
          sx={{mb: 2}}
          >
            <TextField label="correo" type="email" 
            placeholder="correo@servidor.com" fullWidth 
            name="email" value={email} onChange={onInputChange}></TextField>
          </Grid>
        </Grid>

        <Grid container 
        display="block">
          <Grid item >
            <TextField label="contraseña" type="password" 
            placeholder="********" fullWidth
            name="password" value={password} onChange={onInputChange}></TextField>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
          <Grid item xs={12} sm={6} display={(!!errorMessage) ? "" : "none"}>
            <Alert severity="error">
              {errorMessage}
            </Alert>
          </Grid>
          
          <Grid container item xs={12} sm={6} >  
            <Button variant="contained" fullWidth
            type="submit" disabled={statusValidator}>
              Login
            </Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button variant="contained" fullWidth
            onClick={() => onGoogleLog()} disabled={statusValidator}>
              <Google/>
                <Typography sx={{ml: 1}}>
                  Google
                </Typography>
            </Button>
          </Grid>

          <Grid container direction="row" justifyContent="end" >
            <Link component={ReactLink} color="inherit" to="/auth/register" >
              Crear una cuenta
            </Link>  
          </Grid>
        </Grid>

      </form>

    </AuthLayout>

  )
}
