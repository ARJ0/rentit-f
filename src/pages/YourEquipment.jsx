import React, { useEffect, useState } from 'react'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import EditIcon from '@mui/icons-material/Edit';
import Select from "react-select";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Explore from './Explore'
import { deleteEquipment, getEquipmentByCompanyIdAndSearch } from '../services/actionCreator'
import { toaster } from '../services/toaster'
import { equipmentCategories, equipmentCategoriesTypeName, getlocalStorage } from '../services/helper'
import EquipmentCard from '../components/EquipmentCard'
import Loader from '../services/Loader';
import EditEquipmentModal from '../components/EditEquipmentModal';


const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));


const sortOp = [
  {label: "A-Z" , value: 1},
  {label: "Z-A" , value: 2},
  {label: "Low to High" , value: 3},
  {label: "High to Low" , value: 4},
]

export const YourEquipment = () => {

    const [equipment, setEquipment] = useState([]);
    const [category, setCategory] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const [selecetedItem, setSelecetedItem] = useState(null);
    const [sortBy, setSortBy] = useState()

    const get = () => {
        const loggedUser = getlocalStorage('loggedUser');
        setIsLoading(true);

        
        let params = {
            userId: loggedUser?._id
        }
        if (category.length > 0) {
            params.category = category;
        }
        if (sortBy) {
          params.sortBy = [3,4].includes(sortBy.value) ? "rent" : "title";
          params.sortOrder = [1,3].includes(sortBy.value) ? "asc" : "desc";
        }
        getEquipmentByCompanyIdAndSearch(params).then((data) => {
            setEquipment(data);
            setIsLoading(false)
        }).catch((err) => {
            toaster(err?.response?.data, 'error');
            console.log("err -=-= ", err)
            setIsLoading(false)
        })
    }
    const changeCategories = (val) => {
        if (category.indexOf(val) != -1) {
          setCategory(category.filter((cat) => cat != val));
        } else {
            setCategory([...category, val]);
        }
    };
    const closeModal = (isEdit = false) => {
      setIsOpen(false);
      setSelecetedItem(null);
      isEdit && get()
    }
    const openModal = (info) => {
      setIsOpen(true);
      setSelecetedItem(info);
    }

    const _deleteEquipment = (info, actions) => {
      const reqBody = {
        equipmentId: info._id,
        actions
      }
      deleteEquipment(reqBody).then((data) => {
        toaster(data?.message, "success")
        closeModal(true)
      }).catch((error) => {
        toaster(error?.response?.data, 'error');
        console.log("🚀 ~ addEquipment ~ error:", error)
      })
    }
    
    useEffect(() =>{
        get()
    }, [category, sortBy])
  
  return (
    <>
        
        <div
        className="page explore"
      >
         {isLoading && <Loader/>}
        <div className="top flex-col">
          <div className="categories">
            <div className={`pill `}>
              <FilterAltIcon sx={{ fontSize: 30 }} />
            </div>
            <div className='pill' style={{"min-width": "10%"}}>
              <Select 
                className="select"
                options={sortOp}
                onChange={(e) => setSortBy(e)}
                aria-label="Sort options"
              />
            </div>
            {equipmentCategories.map((op) => (
              <button
                className={`pill ${category.includes(op.value)  ? "blue" : "yellow"}`}
                onClick={() => {
                  changeCategories(op.value);
                }}
              >
                {op.label}
              </button>
            ))}
          </div>
        </div>

        <div className="listProduct">

<div className="container">
  <div className="row">
    <div className="col-xs-12">
      <table summary="This table shows how to create responsive tables using Datatables' extended functionality" className="table table-bordered table-hover dt-responsive">
        <thead>
          <tr>
            <th>#</th>
            <th>Equipment</th>
            <th>Title</th>
            <th>Type</th>
            <th>Rent</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          
          {equipment.length > 0 ? equipment.map((info, index) => {
            return (
              <tr>
            <td>{index+1}</td>
            <td>
              <div className='d-flex align-items-center'>
              <img src={info.image} alt={`${index}`} className="rounded-circle" style={{"width": "100px",  "height": "100px"}} />
              </div>
            </td>
            <td>{info.title}</td>
            <td>{equipmentCategoriesTypeName[info.category]}</td>
            <td>${info.rent.toFixed(2)} {info.timeperiod}</td>
            <td>
              <button className='btn' aria-label="Edit" onClick={() => openModal(info)}><EditIcon sx={{ fontSize: 30 }} /></button>
              <FormControlLabel
                control={<IOSSwitch sx={{ m: 1 }} defaultChecked={!info.isDeleted} onChange={() => _deleteEquipment(info, !info.isDeleted)} />}
                label=""
                aria-label="Delete Equipment"
              />
            </td>
          </tr>
            )
          }) :
            <tr>
              <td colspan='6' className='text-center'>No Equipment</td>
            </tr>} 
        </tbody>
      </table>
    </div>
  </div>
</div>
        </div>
      </div>

      {isOpen && selecetedItem && <EditEquipmentModal  closeModal={closeModal} selecetedItem={selecetedItem}/>}
    </>
  )
}
