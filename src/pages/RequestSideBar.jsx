import React, { useEffect, useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import CloseIcon from '@mui/icons-material/Close';
import { getOutEquipment, getUserOwnedRequests } from '../services/actionCreator';
import Loader from '../services/Loader';
import { getlocalStorage } from '../services/helper';
import { toaster } from '../services/toaster';
import CheckOutModal from '../components/CheckOutModal';

const RequestSideBar = ({ closeSidebar }) => {
  const [request, setRequest] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [showModal,setShowModal] = useState(false);
  const [selecetedEquipment, setSelecetedEquipment] = useState(null);
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const loggedUser = getlocalStorage('loggedUser');

  const get = () => {
    setIsLoading(true)
    let params = {
      id: loggedUser?._id
    }
    getUserOwnedRequests(params).then((data) => {
      setRequest(data);
      setIsLoading(false)
    }).catch((err) => {
      toaster(err?.response?.data, 'error');
      console.log("err -=-= ", err)
      setIsLoading(false)
    })
  }

  const getColoreStatusType = (type) => {
    let colore = '';
    switch (type) {
      case 'pending':
        colore = "text-warning"
        break;
      case "approved":
        colore = "btn-success"
        break;
      case "rejected":
        colore = "btn-danger"
        break;
      default:
        colore = 'btn-dark'
    }
    return colore
  }

  const closeModal = (isCloseSidebar = false) => {
    setShowModal(false)
    isCloseSidebar && closeSidebar()
  }

  useEffect(() => {
    get()
  }, [])
  return (
    <>
    <div className="position-fixed top-0 z-1031 end-0 w-50 h-100 bg-light d-flex flex-column">
      <button className="btn align-self-start m-2 p-1" aria-label="Close sidebar" onClick={closeSidebar}><CloseIcon /></button>
      <div className="p-3 min-vh-100"  style={{"overflow": "auto"}}>
        {isLoading && <Loader />}
        <div className="row">
          <div className="col">
            <div>
              <h3>All Request</h3>
            </div>
            <div className="table-responsive">
              <table className="table align-middle mb-0 bg-white">
                <thead className="bg-light">
                  <tr className='text-center'>
                    <th>Company</th>
                    <th>Equipment</th>
                    <th>Date</th>
                    <th>Total Rent</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {request?.length === 0 ? <tr>
                    <td colSpan={5} className='text-center border-0'>No Request</td>
                  </tr> :

                    request.map((data) => {
                      return (
                        <tr>
                          <td>
                            <div className='d-flex flex-column text-center'>
                              <div>
                                <AccountCircleIcon sx={{ fontSize: 30 }} />

                              </div>
                              <span>{`${data.companyId.company_name}`}</span>
                              <span>{`${data.companyId.email}`}</span>
                              <span>{`${data.companyId.mobile}`}</span>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                src={data.equipmentId.image}
                                alt=""
                                style={{ width: '100px', height: '100px' }}
                                className="rounded-circle"
                              />
                              <div className="ms-3 word-wrap">
                                <p className="fw-bold mb-1">{data.equipmentId.title}</p>
                              </div>
                            </div>
                          </td>
                          <td className='text-center'>
                            <p className="mb-0">{new Date(data.startDate).toLocaleDateString(undefined, options)} </p>
                            <p className='fw-bold mb-0 text-center'>{"TO"}</p>
                            <p className="mb-0">{new Date(data.endDate).toLocaleDateString(undefined, options)}</p>
                          </td>
                          <td className='text-center'>
                            <p className="mb-0">${data.totalRent}</p>
                          </td>

                          <td className='text-center'>
                            {data.status === "approved" ? 
                            <button 
                              type="button" 
                              className="btn btn-light btn-sm btn-rounded text-capitalize" 
                              style={{marginRight: "10px"}} 
                              onClick={() => {
                                setShowModal(true) 
                                setSelecetedEquipment(data)
                              }} >
                            check out {" "}<ShoppingCartCheckoutIcon sx={{ fontSize: 20 }} color="success" />
                          </button> : 
                            <span className={`btn text-capitalize ${getColoreStatusType(data.status)}`}>{data.status}</span>}
                          </td>
                        </tr>
                      )
                    })
                  }

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    {showModal && selecetedEquipment &&
      <CheckOutModal closeModal={closeModal} item={selecetedEquipment}/>
    }
    </>
  )
}

export default RequestSideBar