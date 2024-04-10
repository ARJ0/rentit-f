import React, { useRef, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { checkOutEquipment } from '../services/actionCreator';
import { equipmentCategoriesTypeName, getlocalStorage } from '../services/helper';
import { toaster } from '../services/toaster';
import moment from "moment";
import '../PDF/pdf.css'
import { PDFCSS, PDFHTML } from '../PDF/PdfGenerator';
import html2pdf from "js-html2pdf";
import PayPalButton from './PayPalButton';

const CheckOutModal = ({ closeModal, item }) => {
    let userData = getlocalStorage("loggedUser")
    console.log("first *-*-* ", item)
    const containerRef = useRef();
    const [personName, setPersonName] = useState()
    const [personNumber, setPersonNumber] = useState();
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    const _checkOutEquipment = (_equipment) => {
        const _userData = getlocalStorage("loggedUser");
        if (!personName || !personNumber || !email) {
            toaster("Please fill all the details", "error")
            return
        }
        setIsLoading(true)
        const params = {
            equipmentId: _equipment?.equipmentId?._id,
            userId: _userData?._id,
            isCheckOut: true,
            personName,
            personNumber,
            email
        }
        checkOutEquipment(params).then((data) => {
            console.log("🚀 ~ checkOutEquipment ~ data:", data)
            setIsLoading(false)
            toaster("Check Out Successfully!!", 'success');
            closeModal(true)
        }).catch((err) => {
            console.log("🚀 ~ checkOutEquipment ~ err:", err)
            setIsLoading(false)
        })
    }

    const downloadInvoice = () => {
        // PdfGenerator(item)
        const __html = document.getElementById('pdf')
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

        const exporter = new html2pdf(__html, pdfOptions);

        exporter.getPdf(true).then((pdf) => {
            console.log("PDF generated:", pdf);
        });
    }
    return (
        <>
            <Modal
                show={true}
                size='xl'
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Pickup Person Details
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <div className="my-4">
                            <div className="row">
                                <div className='col-md-12 mb-4' id='pdf'>
                                    <div className="invoice-container">
                                        <div className="receipt-main col-xs-10 col-sm-10 col-md-12 col-xs-offset-1 col-sm-offset-1 col-md-offset-3">
                                            <div className="row">
                                                <div className="receipt-header">
                                                    <div className="col-xs-6 col-sm-6 col-md-6">
                                                        <div className="receipt-left">
                                                            <h1>Invoice</h1>
                                                        </div>
                                                    </div>
                                                    <div className="col-xs-6 col-sm-6 col-md-6 text-right mr-5">
                                                        <div className="receipt-right text-xl-end">
                                                            <h5>Company Info</h5>
                                                            <p>{item.companyId.company_name}</p>
                                                            <p>+1 {item.companyId.mobile} <i className="fa fa-phone"></i></p>
                                                            <p>{item.companyId.email} <i className="fa fa-envelope-o"></i></p>
                                                            <p>{item.companyId.address} <i className="fa fa-location-arrow"></i></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="receipt-header receipt-header-mid">
                                                    <div className="col-xs-8 col-sm-8 col-md-8 text-left">
                                                        <div className="receipt-right text-start">
                                                            <h5>Customer Info</h5>
                                                            <p>{userData.fname} ${userData.lname}</p>
                                                            <p>+1 {userData.mobile}</p>
                                                            <p>{userData.email}</p>
                                                            <p>{userData.address}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <table className="table table-bordered">
                                                    <thead>
                                                        <tr>
                                                            <th>Description</th>
                                                            <th>Amount </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className="col-md-9">
                                                                <h4><b>Equipment Info :-</b></h4>
                                                                <p><b>Name :</b>{item.equipmentId.title}</p>
                                                                <p><b>Type :</b>{equipmentCategoriesTypeName[item.equipmentId.category]}</p>
                                                                <p><b>Description :</b>{item.equipmentId.description}</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="col-md-9">Per Day Rent </td>
                                                            <td className="col-md-3"><i className="fa fa-inr"></i> $ {item.equipmentId.rent}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="col-md-9">
                                                                Total days
                                                            </td>
                                                            <td className="col-md-3"><i className="fa fa-inr"></i> {moment(item.endDate).diff(item.startDate, 'days') + 1} Days</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-right">
                                                                <p>
                                                                    <strong>Total Amount: </strong>
                                                                </p>
                                                            </td>
                                                            <td>
                                                                <p>
                                                                    <strong><i className="fa fa-inr"></i> $ {item.totalRent}</strong>
                                                                </p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-right">
                                                                <h2><strong>Payable Amount: </strong></h2>
                                                            </td>
                                                            <td className="text-left text-danger">
                                                                <h2><strong><i className="fa fa-inr"></i> $ {item.totalRent + 100}</strong></h2>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="row">
                                                <div className="receipt-header receipt-header-mid receipt-footer">
                                                    <div className="col-xs-8 col-sm-8 col-md-8 text-left">
                                                        <div className="receipt-right text-start">
                                                            <p><b>Date :</b> {moment().format('LL')}</p>
                                                            <h5 style={{"color": "rgb(140, 140, 140)"}}>Thanks for renting.!</h5>
                                                        </div>
                                                    </div>
                                                    <div className="col-xs-4 col-sm-4 col-md-4">
                                                        <div className="receipt-left">
                                                            <h1 style={{"color": "rgb(140, 140, 140)"}}>Stamp</h1>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 mb-4">
                                    <div className="form-group">
                                        <label htmlFor="personName">Name :</label>
                                        <input
                                            id="personName"
                                            type="text"
                                            className="form-control"
                                            value={personName}
                                            required
                                            onChange={(e) => {
                                                if (!/^[A-Za-z\s]*$/.test(e.target.value)) return;
                                                setPersonName(e.target.value)
                                            }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="personNumber">Number :</label>
                                        <input
                                            id="personNumber"
                                            type="number"
                                            className="form-control"
                                            value={personNumber}
                                            onChange={(e) => setPersonNumber(e.target.value)}
                                            required
                                            onBlur={(e) => {
                                                const numberLength = e.target.value.toString().length;
                                                if (numberLength > 10) {
                                                    setPersonNumber('')
                                                    toaster("The number is more than 10 digits", "error");
                                                    return;
                                                } else if (numberLength < 10) {
                                                    setPersonNumber('')
                                                    toaster("The number is less than 10 digits.", "error");
                                                    return;
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-3 mb-4">
                                    <div className="form-group">
                                        <label
                                            id="email-label"
                                            className="mb-1"
                                            for="email"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={email}
                                            placeholder="Enter email"
                                            className="form-control"
                                            required
                                            onChange={(e) => setEmail(e.target.value)}
                                            onBlur={(e) => {
                                                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                                if (!emailRegex.test(e.target.value)) {
                                                    setEmail('')
                                                    toaster("Invalid Eamil !!", "error");
                                                    return;
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-12 w-100 mb-4 d-flex justify-content-center'>
                            <div className='col-md-3 mb-4'>
                                    <PayPalButton equipment={item} isDisabled={!personName || !personNumber || !email} checkOutEquipment={_checkOutEquipment} />
                                </div>
                                </div>
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-light' onClick={closeModal}>Close</button>

                    <button
                        className="btn btn-primary blue"
                        onClick={downloadInvoice}
                        disabled={isLoading}
                    >
                        Download Invoice
                    </button>
                    {/* <button
                        className="btn btn-primary blue"
                        onClick={_checkOutEquipment}
                        disabled={isLoading}
                    >
                        Check Out
                    </button> */}
                    
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CheckOutModal