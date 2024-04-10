import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { equipmentCategories, equipmentCategoriesTypeName } from '../services/helper';
import { sendRequest } from '../services/actionCreator';
import { toaster } from '../services/toaster';

const examples = {
    heavy_machinery:'AB12CD-34-56',
    tools:'AB1234',
    construction:"ABC123",
    earth_movers:'ABCDE',
    snow_removal:'AB123'
}

const RequestModal = ({ closeModal, selecetedEq }) => {
    const { _id, title, category, rent, available, image, location, timeperiod, borrowerid, description, age, companyId } = selecetedEq;

    const [isLoading, setIsLoading] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    const [licenseNumber, setLicenseNumber] = useState('');
    const [inputError, setInputError] = useState('');

    function validateEquipmentLicenseNumber(number, equipmentType) {
        let pattern;
      
        // Define a default pattern for unknown types
        pattern = /^[A-Z0-9]{6}-[A-Z0-9]{2}-[0-9]{2}$/;
      
        // Override default pattern if a specific type is provided
        switch (equipmentType) {
            case "heavy_machinery": 
                pattern= /^[A-Z0-9]{6}-[A-Z0-9]{2}-[0-9]{2}$/;
            break;
          case "tools":
            pattern = /^[A-Z]{2}\d{4}$/;
            break;
          case "construction":
            pattern = /^[A-Z]{3}\d{3}$/;
            break;
          case "earth_movers":
            pattern = /^[A-Z0-9]{5}$/;
            break;
          case "snow_removal":
            pattern = /^[A-Z]{2}\d{3}$/;
            break;
        }
      
        // Check if the license number matches the pattern
        if (!pattern.test(number)) {
            setInputError("Invalid license number for the equipment")
            return "Invalid license number for the equipment";
        } else {
            setInputError('')
        }
      }
    

    const _sendRequest = () => {
        const params = {
            equipmentId: _id,
            companyId,
            renterId: loggedUser?._id,
            startDate,
            endDate,
            licenseNumber
        }
        sendRequest(params).then((data) => {
            toaster(data?.message, "success")
            closeModal()
        }).catch((err) => {
            console.log("error  -=-=-= ", err)
            toaster(err.response.data, "error")
        })
    }

    return (
        <Modal
            show={true}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Send Request
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container">
                    <div className="my-4">
                        <div className="row">
                            <div className="col-md-6 mb-4">
                                <div className="form-group">
                                    <label htmlFor="image" className="mb-3">Image :</label>
                                    <img src={image || ""} className="avatar img-fluid mb-3" alt="" />
                                </div>
                            </div>
                            <div className="col-md-6 mb-4">
                                <div className="form-group">
                                    <label htmlFor="name">Name :</label>
                                    <input
                                        id="name"
                                        type="text"
                                        className="form-control"
                                        value={title}
                                        disabled={true}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description :</label>
                                    <textarea
                                        id="description"
                                        type="text"
                                        rows={5}
                                        className="form-control"
                                        value={description}
                                        disabled={true}
                                    ></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="city">Location :</label>
                                    <input
                                        id="city"
                                        type="text"
                                        className="form-control"
                                        value={location}
                                        disabled={true}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="category">Category :</label>
                                    <Select
                                        id="category"
                                        className="select"
                                        value={equipmentCategories.find((ca) => ca.value === category)}
                                        isDisabled={true}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="rent">Rent :</label>
                                    <div className="input-group">
                                        <input
                                            id="rent"
                                            type="number"
                                            className="form-control"
                                            value={rent}
                                            disabled={true}
                                        />
                                        <select
                                            name=""
                                            id="timeduration"
                                            className="form-control yellow"
                                            value={timeperiod}
                                            disabled={true}
                                        >
                                            <option value="Per Day">Per Day</option>
                                            <option value="Per Month">Per Month</option>
                                            <option value="Per Year">Per Year</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="dop">Date of Purchase :</label>
                                    <input
                                        id="dop"
                                        type="date"
                                        className="form-control"
                                        value={age}
                                        disabled={true}
                                    />
                                </div>
                                    <div className='form-group'>
                                    <label>Enter License Number :</label>
                                    <input
                                        type="text"
                                        value={licenseNumber}
                                        className='form-control'
                                        onChange={(e)=> setLicenseNumber(e.target.value)}
                                        onBlur={() => validateEquipmentLicenseNumber(licenseNumber, category )}
                                        placeholder={`Enter ${equipmentCategoriesTypeName[category]} License Number`}
                                    />
                                    <span className='text-muted' style={{ "fontSize": "13px" }}>Eg:- {examples[category] ?? examples.default}</span>
                                    {inputError && <p style={{ color: 'red' }}>{inputError}</p>}
                                    </div>
                                <div className="form-group">
                                    <label htmlFor="startDate">Start Date :</label>
                                    <div>
                                        <DatePicker
                                            id="startDate"
                                            className="form-control"
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            minDate={new Date()}
                                            isClearable
                                            dateFormat="yyyy/MM/dd"
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="endDate">End Date :</label>
                                    <div>
                                        <DatePicker
                                            id="endDate"
                                            className="form-control"
                                            selected={endDate}
                                            onChange={(date) => setEndDate(date)}
                                            minDate={startDate || new Date()}
                                            isClearable
                                            dateFormat="yyyy/MM/dd"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <button className='btn btn-light' onClick={closeModal}>Close</button>
                <button
                    className="btn btn-primary blue"
                    onClick={_sendRequest}
                    disabled={isLoading}
                >
                    {isLoading ? "Loading ..." : "Send Requesr"}
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default RequestModal