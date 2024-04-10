import React, { useEffect, useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { deleteItemCart, getCart } from '../services/actionCreator';
import { getlocalStorage } from '../services/helper';
import Loader from '../services/Loader';
import RequestModal from '../components/RequestModal';

const AddToCart = ({ closeSidebar }) => {

  const [cartData, setCartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selecetedEq, setSelecetedEq] = useState(null);
  const [isOpen, setIsOpen] = useState(false);


  const openModal = (product) => {
    setIsOpen(true);
    setSelecetedEq(product)
  }
  const closeModal = () => {
    setIsOpen(false);
    setSelecetedEq(null);
  }


  const _userData = getlocalStorage("loggedUser")
  const _getCart = () => {
    const params = {
      userId: _userData?._id
    }
    setIsLoading(true)
    getCart(params).then((data) => {
      setCartData(data)
      setIsLoading(false)
    }).catch((err) => {
      setIsLoading(false)
      console.log("🚀 ~ getCart ~ err:", err)
    })
  }
  const removeCartItem = (item) => {
    const params = {
      userId: _userData?._id,
      equipmentId: item?._id
    }
    deleteItemCart(params).then((data) => {
      console.log("data [=-==-= ", data)
      _getCart()
    }).catch((err) => {
      console.log("🚀 ~ deleteItemCart ~ err:", err)
    })
  }
  useEffect(() => {
    _getCart()
  }, [])

  return (
    <div className="position-fixed top-0 z-1031 end-0 h-100 bg-light d-flex flex-column" style={{"width": "45%" }}>
      <button className="btn  align-self-start m-2 p-1" onClick={closeSidebar}><CloseIcon /></button>
      <div className="p-3 min-vh-100" style={{"overflow": "auto"}}>
        {isLoading && <Loader />}
        <h3><b>Cart</b></h3>
        {cartData.length === 0 ? (
          <div className="d-flex flex-column align-items-center justify-content-center" style={{ marginTop: '50%' }}>
            <p>No products in the cart.</p>
            <AddShoppingCartIcon style={{ fontSize: 100, color: 'gray' }} />
          </div>
        ) : (
          <ul className="list-group">
            {cartData.map((product, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-end">
                <div className="d-flex align-items-center">
                  <img src={product.image} alt={product.title} style={{ width: '140px', marginRight: '10px' }} />
                  <div>
                    <h5>{product.title}</h5>
                    <p>Rent: ${product.rent}</p>
                  </div>
                </div>
                <div>
                  <div className="d-flex justify-content-between">
                    <button className="btn btn-primary" style={{ marginRight: '8px' }} onClick={() => {openModal(product) }}>
                    Borrowing {" "} <SendIcon sx={{ fontSize: 20 }} />
                    </button>
                    <button className='btn btn-light' onClick={() => { removeCartItem(product) }}>
                      Delete {" "}<DeleteForeverIcon sx={{ fontSize: 20 }} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {isOpen && selecetedEq &&  <RequestModal closeModal={closeModal} selecetedEq={selecetedEq}/>}
    </div>
  )
}

export default AddToCart