import { async } from "@firebase/util"
import { collection, doc, setDoc } from "firebase/firestore/lite"
import { FirebaseDB } from "../../firebase/config"
import { fileUpload } from "../../helpers/fileUpload"
import { loadNotes } from "../../helpers/loadNotes"
import { addNewEmptyNote, savingNewNote, setActiveNote, setFotosActiveNote, setNotes, setSavingNotes, updateNote } from "./journalSlice"

export const startNewNote = () => {
  return async( dispatch, getState ) =>{
    
    dispatch(savingNewNote())
    const {uid} = getState().auth


    const newNote = {
        title: "",
        body: "",
        date: new Date().getTime(),
    }

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`))
    await setDoc(newDoc, newNote)
    
    dispatch(addNewEmptyNote(newNote))
    dispatch(setActiveNote(newNote))


  }
}

export const startLoadingNotes = ()=>{
   return async(dispatch, getState) =>{

    const {uid} = getState().auth
    if (!uid) throw new Error("El UID no existe")

    const notes = await (loadNotes(uid))
  
    dispatch(setNotes(notes))
    }
}

export const activeNote = ({title = "", body = "", date, id, imageURL = []}) => {
  return async(dispatch) =>{
    
    const newNote = {
      id, title, body, date, imageURL,
  }

    dispatch(setActiveNote(newNote))
  }
}

export const SavingNote = () => {
  return async(dispatch, getState) => {

    dispatch(setSavingNotes())

    const {uid} = getState().auth
    const {active: activeNote} = getState().journal

    const noteToFirestore = {...activeNote}
    delete noteToFirestore.id
    
    const refDoc = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`) //se crea la referencia al documento
    await setDoc(refDoc, noteToFirestore,{merge: true}) //aca impacta el cambio // el merge sirve por si hay campos en noteToFirestore que no estan en la referencia `${uid}/journal/notes/${activeNote.id}`, se mantiene todo, al reves tambien funciona
    
  
    dispatch(updateNote(activeNote))
  }
}

export const startUploadingFiles = (files = []) =>{
    return async(dispatch)=>{

      dispatch(setSavingNotes())
     
      const fileUploadPromises = [] //arreglo de promesas (fotos) que se dispararan al mismo tiempo 
      for (const file of files) {
        fileUploadPromises.push(fileUpload(file)) // se va a almacenar en fileUploadPromises el url de cada foto
      }
      console.log(fileUploadPromises)
      const fotosURL = await Promise.all(fileUploadPromises) // cuando se resuelve el await devuelve un arreglo con la resolucion de las promesas en el mismo orden que se envian
      dispatch(setFotosActiveNote(fotosURL))

    }
}