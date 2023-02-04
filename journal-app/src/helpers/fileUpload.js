

export const fileUpload = async(file) =>{

    if(!file) throw new Error("no hay archivo seleccionado a subir")
    const cloudURL = "https://api.cloudinary.com/v1_1/journalappproject/upload"

    const formData = new FormData()
    formData.append("upload_preset","react-journal")
    formData.append("file", file)

    try{
        const resp = await fetch(cloudURL,{
            method: "POST",
            body: formData
        })
        console.log(resp)
        if(!resp.ok) throw new Error("no se subió la imagen")
        
        const cloudResp = await resp.json()
        console.log(cloudResp)
        console.log(cloudResp.secure_url)
        return cloudResp.secure_url

    } catch(error){
        console.log(error)
        throw new Error(error.message)
    }

}