import React, { useEffect, useState } from 'react';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { equipmentCategoriesTypeName, getlocalStorage } from '../services/helper';
import { getUserRequests, manageRequestStatus } from '../services/actionCreator';
import { toaster } from '../services/toaster';
import Loader from '../services/Loader';

const AllRequest = () => { 
  const [request, setRequest] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const loggedUser = getlocalStorage('loggedUser');

  const get = () => {
    setIsLoading(true)
    let params = {
      companyId: loggedUser?._id
    }
    getUserRequests(params).then((data) => {
      console.log("first -=-=- ", data)
      setRequest(data);
      setIsLoading(false)
    }).catch((err) => {
      toaster(err?.response?.data, 'error');
      console.log("err -=-= ", err)
      setIsLoading(false)
    })
  }

  const _manageRequestStatus = (info, action) => {
    const params = {
      requestId: info._id,
      action: `${action}`
    }
    setIsLoading(true)
    manageRequestStatus(params).then((data) => {
      toaster("Request updated successfully !!", "success")
      get()
      setIsLoading(false)
    }).catch((error) => {
      console.log("error -=-=-=-= ",error)
      setIsLoading(false)
    })
  }

  const getColoreStatusType = (type) => {
    let colore = '';
    switch(type) {
      case 'pending': 
        colore  = "text-warning"
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

  useEffect(() => {
    get()
  }, [])

  return (
    <div className="container page ">
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
                  <th>Users</th>
                  <th>Equipment</th>
                  <th>License Number</th>
                  <th>Date</th>
                  <th>Total Rent</th>
                  <th>Status</th>
                  <th>Actions</th>
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
                            <span>{`${data.renterId.fname} ${data.renterId.lname}`}</span>
                            <span>{`${data.renterId.email}`}</span>
                            <span>{`${data.renterId.mobile}`}</span>
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
                              <p className="text-muted mb-0">{equipmentCategoriesTypeName[data.equipmentId.category]}</p>
                            </div>
                          </div>
                        </td>
                        <td className='text-center'>
                          <p className="mb-0">{data.licenseNumber}</p>
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
                          <span className={`btn text-capitalize ${getColoreStatusType(data.status)}`}>{data.status}</span>
                        </td>
                        <td className='text-center'>
                          <button type="button" className="btn btn-light btn-sm btn-rounded" style={{marginRight: "10px"}} onClick={() => _manageRequestStatus(data, "approved")}>
                          Approve {" "}<ThumbUpOffAltIcon sx={{ fontSize: 20 }} color="success" />
                          </button>
                          <button type="button" className="btn btn-light btn-sm btn-rounded" onClick={() => _manageRequestStatus(data, "rejected")}>
                          Reject {" "}<ThumbDownOffAltIcon sx={{ fontSize: 20 }} color='error' />
                          </button>
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
  );
};

export default AllRequest;
