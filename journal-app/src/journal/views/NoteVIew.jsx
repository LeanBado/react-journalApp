import { DeleteOutline, SaveOutlined, UploadFileOutlined } from '@mui/icons-material'
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import React from 'react'
import { ImageGallerys } from '../components/ImageGallerys'
import { useDispatch, useSelector } from "react-redux"
import { useForm } from '../../hooks/useForm'
import { useEffect } from 'react'
import { setActiveNote } from '../../store/journal/journalSlice'
import { SavingNote, startDeletingNotes, startUploadingFiles } from '../../store/journal/thunks'
import Swal from "sweetalert2"
import "sweetalert2/dist/sweetalert2.css"
import { useRef } from 'react'

export const NoteVIew = () => {
    const dispatch = useDispatch()
    const {active: noteActive, savedMessage, isSaving} = useSelector(state => state.journal)
    const { title, body, onInputChange, date, formState } = useForm(noteActive)

    const dateString = new Date(date).toUTCString() // configura la fecha

    useEffect(() => {
        dispatch(setActiveNote(formState))
    }, [formState]);

    useEffect(() => {
       if(savedMessage.length >0){//el savedMessage va a variar entre texto vacio y con caracteres, solo se dispara cuando tiene caracteres
        Swal.fire("Nota actualizada", savedMessage, "success")
       }
    }, [savedMessage]);

    const fileRef = useRef()

    const onSaveNote = ()=>{
        dispatch(SavingNote())
    }

    const onInputFile = ({target}) =>{
       if(target.files === 0) return
       console.log("subiendo archivos")
        dispatch(startUploadingFiles(target.files))
    }

    const onDelete = ()=>{
        dispatch(startDeletingNotes())
    }

  return (
    <Grid container direction="row" justifyContent="space-between" sx={{mb: 1 }}>
        <Grid item>
            <Typography fontSize={39} fontWeight="light"> {dateString}</Typography>
        </Grid>

        <Grid item>

            <input type="file" multiple onChange={onInputFile} ref={fileRef}
            style={{display: "none"}}></input>
            <IconButton color="primary"
            disabled={isSaving}
            onClick={() => fileRef.current.click()} //esto simula el click en el input type file mediante el uso de ref={fileRef}
            > 
                <UploadFileOutlined></UploadFileOutlined>
            </IconButton>

            <Button color='primary' sx={{padding: 2 }} onClick={onSaveNote}
            disabled={isSaving}>
                <SaveOutlined sx={{fontSize: 30, mr: 1 }}></SaveOutlined>Guardar
            </Button>
        </Grid>

        <Grid container >
            <TextField type="text" variant="filled" 
            fullWidth placeholder="ingrese titulo" 
            label="Titulo" sx={{border: "none", mb: 1 }}
            name="title"
            value={title}
            onChange={onInputChange}
            ></TextField>
            <TextField type="text" variant="filled" 
            fullWidth multiline placeholder="que sucedió hoy?" 
            label="Body" minRows="5"
            name="body"
            value={body}
            onChange={onInputChange}
            ></TextField>

        </Grid>
        
        <Grid container justifyContent="end">
            <Button sx={{mt: 2}} onClick={onDelete}
            >
                <DeleteOutline color='error'></DeleteOutline>
            </Button>
        </Grid>

        <ImageGallerys images={noteActive.imageURL}></ImageGallerys>

    </Grid>
)}
