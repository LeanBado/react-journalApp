import { collection, getDocs } from "firebase/firestore/lite"
import { FirebaseDB } from "../firebase/config"

export const loadNotes = async (uid) => {
    if (!uid) throw new Error("El UID no existe")
    
    const collectionREf = collection(FirebaseDB, `${uid}/journal/notes`)
    const resp = await getDocs(collectionREf)

    const note = []

    resp.forEach(nota =>{
       note.push({id: nota.id, ...nota.data()})
        
    })

 
    return note
}
