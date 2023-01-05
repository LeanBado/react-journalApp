import { SaveOutlined } from '@mui/icons-material'
import { Button, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import { ImageGallerys } from '../components/ImageGallerys'

export const NoteVIew = () => {
  return (
    <Grid container direction="row" justifyContent="space-between" sx={{mb: 1 }}>
        <Grid item>
            <Typography fontSize={39} fontWeight="light"> 3 de Enero de 2023</Typography>
        </Grid>

        <Grid item>
            <Button color='primary' sx={{padding: 2 }}>
                <SaveOutlined sx={{fontSize: 30, mr: 1 }}></SaveOutlined>Guardar
            </Button>
        </Grid>

        <Grid container >
            <TextField type="text" variant="filled" fullWidth placeholder="ingrese titulo" label="Titulo" sx={{border: "none", mb: 1 }}></TextField>
            <TextField type="text" variant="filled" fullWidth multiline placeholder="que sucedió hoy?" label="Titulo" minRows="5"></TextField>

        </Grid>

        <ImageGallerys></ImageGallerys>

    </Grid>
)}
