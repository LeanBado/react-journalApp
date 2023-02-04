import { createSlice } from "@reduxjs/toolkit";

export const journalSlice = createSlice({
    name: "journal",
    initialState: {
        isSaving: false,
        savedMessage: "",
        notes: [],
        active: null,
        /*active: {
            id: "ABC123",
            title: "",
            body: "",
            date: 12/12/22,
            imageURL: [] -> "http://foto1.jpg", "http://foto2.jpg", etc
        }  */

    },
    reducers: { // **todo trabajo sincrono**
        savingNewNote: (state) => { //lo uso para deshabilitar el botón de agregar nota en JournalPage
            state.isSaving = true
        },
        addNewEmptyNote: (state, action ) => { // reducer para agregar nueva entrada
            state.isSaving = false,
            state.notes.push(action.payload)
        },
        setActiveNote: (state, action ) => { // define que nota se muestra en pantalla
            state.active = action.payload
            state.savedMessage = ""
        },
        setNotes: (state, action ) => { // cargar notas
            state.notes = action.payload
        },
        setSavingNotes: (state) => { // grabar notas
            state.isSaving = true
            state.savedMessage = ""
           
        },
        updateNote: (state, action ) => { // actualiza notas
            state.isSaving = false
            state.notes = state.notes.map(note =>{
                 if(action.payload.id == note.id){
                    return action.payload
                }
                return note
            })
            state.savedMessage = `${action.payload.title} -> se guardo correctamente`
        },
        setFotosActiveNote: (state, action) => {
            state.active.imageURL = [...state.active.imageURL, ...action.payload]
            state.isSaving = false
        },
        clearNotesLogout: (state) =>{
            state.isSaving = false
            state.savedMessage = ""
            state.notes = []
            state.active =  null
        },
        deleteNoteById: (state, action ) => { // elimina notas por ID
            state.notes = state.notes.filter(nota => nota.id != action.payload)
            state.active = null
        },
    }
});


// Action creators are generated for each case reducer function
export const { 
    addNewEmptyNote,
    setActiveNote, 
    setNotes, 
    setSavingNotes, 
    updateNote,
    deleteNoteById,
    setFotosActiveNote,
    savingNewNote,
    clearNotesLogout,
     } = journalSlice.actions;