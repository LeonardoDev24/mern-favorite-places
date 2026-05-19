import { useRef, useState, useEffect } from 'react'
import Button from './Button'

import './ImageUpload.css'

function ImageUpload(props) {
    const {id, center,onInput,errorText} = props

    const [file,setFile] = useState(null)
    const [previewUrl,setPreviewUrl] = useState('')
    const [isValid,setIsValid] = useState(false)

    const filePickerRef = useRef()

    const pickImage = () => {
        filePickerRef.current.click()
    }

    const pickedImageHandler = (event) => {
        const userFiles = event.target.files
        console.info(userFiles)
        let pickedFile = null
        let fileIsValid = isValid

        if (userFiles && userFiles.length === 1) {
            pickedFile = userFiles[0]
            setFile(pickedFile)
            setIsValid(true)
            fileIsValid = true
        } else {
            setIsValid(false)
            fileIsValid = false 
        }
        onInput(id,pickedFile,fileIsValid)
    }

    useEffect(() => {
        if (!file) return
        const fileReader = new FileReader()
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result)
        }
        fileReader.readAsDataURL(file)
    },[file])

    return (
        <div className='form-control'>
            <input 
                type="file" 
                name="" 
                id={id} 
                style={{display: 'none'}}
                accept='.jpg, .png, .jpeg'
                ref={filePickerRef}
                onChange={pickedImageHandler}
            />
            <div className={`image-upload ${center && 'center'}`}>
                <div className="image-upload__preview">
                    {previewUrl ? 
                    <img src={previewUrl} alt="Preview" /> : 
                    <p>Please pick an image!</p>}
                </div>
                <Button type='button' onClick={pickImage}>
                    PICK IMAGE
                </Button>
            </div>
            {!isValid && <p>{errorText}</p>}
        </div>
    )
}

export default ImageUpload