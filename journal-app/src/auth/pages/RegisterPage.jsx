import { Link as ReactLink } from "react-router-dom"
import { Google } from "@mui/icons-material"
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks/useForm"

const formData = {
  email: "leandro@gmail.com",
  password: "1234",
  displayName: "Leandro"

}


export const RegisterPage = () => {

  const {email, password, onInputChange, displayName, formState} = useForm(formData)

  const onSubmit =(event) =>{
    event.preventDefault()
    console.log(formState)
}

  return (
    <AuthLayout title="Register!!">

      <form onSubmit={onSubmit}>

        <Grid container
        display="block">
          <Grid item
          sx={{mb: 2}}
          >
            <TextField label="Nombre completo" type="text" 
            placeholder="Leandro Martin" fullWidth
            name="displayName" value={displayName} onChange={onInputChange}></TextField>
          </Grid>
        </Grid>

        <Grid container 
        sx={{mb: 2}}
        display="block">
          <Grid item >
            <TextField label="Email" type="email" 
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
          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth>
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
