import { useState } from 'react'
import './PlaceItem.css'
import Card from '../../shared/components/Card'
import Button from '../../shared/components/Button'
import Modal from '../../shared/components/Modal'
import Map from '../../shared/components/Map'

function PlaceItem(props) {
    const {id,image,title,description,address,creatorId,coordinates} = props
    const [showMap,setShowMap] = useState(false)
    
    const openMap = () => setShowMap(true)
    const closeMap = () => setShowMap(false)
    
    const [showConfirmModal,setShowConfirmModal] = useState(false)
    const showDeleteWarning = () => setShowConfirmModal(true)
    const cancelDelete = () => setShowConfirmModal(false)
    const confirmDelete = () => {
        setShowConfirmModal(false)
        console.log('DELETING...')
    }

    return (
        <>
        <Modal
            show={showMap}
            onCancel={closeMap}
            header={address}
            contentClass='place-item__modal-content'
            footerClass='place-item__modal-actions'
            footer={<Button onClick={closeMap}>CLOSE</Button>}
        >
            <div className='map-container'>
                <Map coordinates={coordinates}/>
            </div>
        </Modal>

        <Modal
            show={showConfirmModal}
            onCancel={cancelDelete}
            header='Are you sure?'
            footerClass='place-item__modal-actions'
            footer={
                <>
                    <Button inverse onClick={cancelDelete}>CANCEL</Button>
                    <Button danger onClick={confirmDelete}>DELETE</Button>
                </>
            }
        >
            <h4>Do you want to delete this place?</h4>
            <p>Please note that it can't be undone thereafter</p>
        </Modal>

        <li className='place-item'>
            <Card className='place-item__content'>
                <div className="place-item__image">
                    <img src={image} alt={title} />
                </div>
                <div className="place-item__info">
                    <h2>{title}</h2>
                    <h3>{address}</h3>
                    <p>{description}</p>
                </div>
                <div className="place-item__actions">
                    <Button inverse onClick={openMap}>VIEW ON MAP</Button>
                    <Button to={`/places/${id}`}>EDIT</Button>
                    <Button danger onClick={showDeleteWarning}>DELETE</Button>
                </div>
            </Card>
        </li>
        </>
    )
}

export default PlaceItem