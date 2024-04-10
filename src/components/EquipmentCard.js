import React, { useState } from 'react';
import EquipmentModal from './EquipmentModal';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { accountType, equipmentCategoriesTypeName } from '../services/helper';
import EditEquipmentModal from './EditEquipmentModal';

const EquipmentCard = ({ info, key, isEdit= false, get }) => {
  const { id, title, category, rent, available, image, location, timeperiod, borrowerid } = info;
  const [isOpen, setIsOpen] = useState(false);
  const [selecetedItem, setSelecetedItem] = useState(null)
  

  const openModal = () => {
    setIsOpen(true);
    setSelecetedItem(info)
  }
  const closeModal = () => {
    setIsOpen(false);
    setSelecetedItem(null);
    if (isEdit && get) {
      get()
    }

  }


  return (
    <>
      <div className="card product-card h-100 " style={{ width: '300px', minHeight: "450px" }}>
        <h3 onClick={() => openModal(info)} className="card-title text-center mt-3">{title}</h3>
        <div className="image-container">
          <img src={image} alt={title}  style={{ width: '100%', height: '200px' }}/>
        </div>
        <div className="card-body">
          <p className="card-text mb-2">Type: {equipmentCategoriesTypeName[category]}</p>
          <p className="card-text mb-2">Rental Rate: ${rent.toFixed(2)} {timeperiod}</p>
          <p className={`card-text mb-2 ${!borrowerid ? 'text-success' : 'text-danger'}`}>
            {!borrowerid ? 'Available' : 'Not Available'}
          </p>
          <p className='card-text mb-2'>
            <LocationOnIcon className="location-icon me-1" /> {location}
          </p>
        </div>
      </div>
      {isOpen && selecetedItem &&

      (isEdit ? <EditEquipmentModal  closeModal={closeModal} selecetedItem={selecetedItem}/> : <EquipmentModal closeModal={closeModal} selecetedItem={selecetedItem} />)

      }
    </>
  )
}

export default EquipmentCard;