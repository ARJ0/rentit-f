import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import html2pdf from "js-html2pdf";
import { getAllUserRequest } from '../services/actionCreator';
import { getlocalStorage } from '../services/helper';
import Loader from '../services/Loader';
import { toaster } from '../services/toaster';
import { PDFCSS, PDFHTML } from '../PDF/PdfGenerator';

const History = ({ closeSidebar }) => {

  const [checkedOutOrder, setCheckedOutOrder] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selecetedEquipment, setSelecetedEquipment] = useState(null);
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const userData = getlocalStorage('loggedUser');


  const get = () => {
    setIsLoading(true)
    let params = {
      id: userData?._id
    }
    getAllUserRequest(params).then((data) => {
      setCheckedOutOrder(data);
      setIsLoading(false)
    }).catch((err) => {
      toaster(err?.response?.data, 'error');
      console.log("err -=-= ", err)
      setIsLoading(false)
    })
  }

  const downloadInvoice = (item) => {
    const pdfOptions = {
        margin: 0,
        filename: 'invoice.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };
    const _html = PDFHTML({ item, userData })
    const invoiceHtml = `<style> ${PDFCSS} </style> ${_html}`

    const tempElement = document.createElement('div');
    tempElement.innerHTML = invoiceHtml;

    const exporter = new html2pdf(tempElement, pdfOptions);

    exporter.getPdf(true).then((pdf) => {
        console.log("PDF generated:", pdf);
    });
  }
  useEffect(() => {
    get()
  }, [])
  return (
    <>
      <div className="position-fixed top-0 z-1031 end-0 w-50 h-100 bg-light d-flex flex-column">
        <button className="btn align-self-start m-2 p-1" aria-label="Close sidebar" onClick={closeSidebar}><CloseIcon /></button>
        <div className="p-3 min-vh-100" style={{ "overflow": "auto" }}>
          {isLoading && <Loader />}
          <div className="row">
            <div className="col">
              <div>
                <h3>History</h3>
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
                    {checkedOutOrder?.length === 0 ? <tr>
                      <td colSpan={5} className='text-center border-0'>No Checked Out Order</td>
                    </tr> :

                      checkedOutOrder.map((data) => {
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
                              {data.isCheckOut ?
                                <button
                                  type="button"
                                  className="btn btn-light btn-sm btn-rounded text-capitalize"
                                  style={{ marginRight: "10px" }}
                                  onClick={() => {
                                    downloadInvoice(data)
                                  }} >
                                  Download invoice {" "}<DownloadIcon sx={{ fontSize: 20 }} color="success" />
                                </button> : "-"}
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
    </>
  )
}

export default History