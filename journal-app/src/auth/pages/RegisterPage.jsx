import { Link as ReactLink } from "react-router-dom"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks/useForm"
import { useState, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startCreatingUserWithEmailPw } from "../../store/auth/thunks"


const formData = {
  email: "",
  password: "",
  displayName: ""

}

const validator = {
  email: [(value) => value.includes("@"), "el correo debe ser correcto e incluir @"],
  password: [(value) => value.length >=6, "el password debe tener más de 6 letras"],
  displayName: [(value) => value.length >=1, "el nombre es obligatorio"],
}


export const RegisterPage = () => {

  const dispatch = useDispatch()
  const [inicial, setInicial] = useState(false);
  const {email, password, onInputChange, displayName, formState,
  isValid, emailValid, passwordValid, displayNameValid} = useForm(formData, validator)
  const {status, errorMessage} = useSelector(state => state.auth)
  const statusValidator = useMemo(() => status == "checking", [status])
    
  

  const onSubmit =(event) =>{
    event.preventDefault()
    setInicial(true)
    if (!isValid) {
      return
    }
    dispatch(startCreatingUserWithEmailPw(formState))
   
}

  return (
    <AuthLayout title="Register!!">
      <h2>ESTADO DE FORMULARIO: <input type="checkbox" checked={isValid} readOnly></input></h2>

      <form onSubmit={onSubmit}     className='animate__animated animate__fadeIn animate__faster'
>

        <Grid container
        display="block">
          <Grid item
          sx={{mb: 2}}
          >
            <TextField label="Nombre completo" type="text" 
            placeholder="Leandro Martin" fullWidth
            name="displayName" value={displayName} onChange={onInputChange}
            error={!isValid && inicial}
            helperText={displayNameValid}></TextField>
          </Grid>
        </Grid>

        <Grid container 
        sx={{mb: 2}}
        display="block">
          <Grid item >
            <TextField label="Email" type="email" 
            placeholder="correo@servidor.com" fullWidth
            name="email" value={email} onChange={onInputChange}
            error={!isValid && inicial}
            helperText={emailValid}

            ></TextField>
          </Grid>
        </Grid>

        <Grid container 
        display="block">
          <Grid item >
            <TextField label="contraseña" type="password" 
            placeholder="********" fullWidth
            name="password" value={password} onChange={onInputChange}
            error={!isValid && inicial}
            helperText={passwordValid}

            ></TextField>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
          <Grid item xs={12} display={(!!errorMessage) ? "" : "none"}>
            <Alert severity="error">
              {errorMessage}
            </Alert>
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth disabled={statusValidator}>
              registrarse
            </Button>
          </Grid>

          <Grid container direction="row" justifyContent="end" sx={{mt: 2}}>
            <Typography sx={{mr: 1}}>¿Ya tienes cuenta?</Typography>
            <Link component={ReactLink} color="inherit" to="/auth/login" >
              ingresar
            </Link>  
          </Grid>
        </Grid>

      </form>

    </AuthLayout>

  )
}
