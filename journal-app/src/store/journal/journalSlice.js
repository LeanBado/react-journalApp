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
        },
        setNotes: (state, action ) => { // cargar notas
            state.notes = action.payload
        },
        setSavingNotes: (state, action ) => { // grabar notas

        },
        updateNote: (state, action ) => { // actualiza notas

        },
        deleteNoteById: (state, action ) => { // elimina notas por ID

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
    savingNewNote,
     } = journalSlice.actions;