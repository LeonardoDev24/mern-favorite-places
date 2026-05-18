import { useRef } from 'react'
import Button from './Button'

import './ImageUpload.css'

function ImageUpload(props) {
    const {id, center} = props
    const filePickerRef = useRef()

    const pickImage = () => {
        filePickerRef.current.click()
    }

    const pickedImageHandler = (event) => {
        console.info(event.target)
    }
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
                    <img src="" alt="Preview" />
                </div>
                <Button type='button' onClick={pickImage}>
                    PICK IMAGE
                </Button>
            </div>
        </div>
    )
}

export default ImageUpload