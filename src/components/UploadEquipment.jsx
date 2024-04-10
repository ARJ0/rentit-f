import React, { useEffect, useState } from 'react'
import Select from "react-select";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import firebaseUpload from '../services/firbaseUpload';
import Modal from 'react-bootstrap/Modal';
import { toaster } from '../services/toaster';
import { useNavigate } from 'react-router-dom';
import { addEquipment } from '../services/actionCreator';
import { equipmentCategories } from '../services/helper';

const UploadEquipment = ({closeModal}) => {

    const navigate = useNavigate();
    const [img, setImg] = useState();
    const [preview, setPreview] = useState();
    const [name, setname] = useState();
    const [description, setdescription] = useState();
    const [category, setcategory] = useState();
    const [rent, setrent] = useState();
    const [timeduration, settimeduration] = useState("Per Day");
    const [dop, setdop] = useState();
    const [city, setCity] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");


    const handleFile = (e) => {
        setImg(e.target.files[0]);
    };
    const fileSelect = () => {
        if (typeof img == "object") setPreview(URL.createObjectURL(img));
        else setPreview(img);
    };

    const handleSubmit = async () => {
        if (
            name && description && category && rent && timeduration && dop && img
        ) {
            const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
            setIsLoading(true);

            await firebaseUpload(img, name, async (img_url) => {

                const reqBody = {
                    title: name,
                    description,
                    age: dop,
                    rent,
                    timeperiod: timeduration,
                    category,
                    image: img_url.data,
                    location: city,
                    currUserId: loggedUser?._id ?? ""
                };
                addEquipment(reqBody).then((data) => {
                    navigate('/your-equipment')
                    toaster(data?.message, "success")
                }).catch((error) => {
                    toaster(error?.response?.data, 'error');
                    console.log("🚀 ~ addEquipment ~ error:", error)
                })

            }, () => {
                toaster("Image not uploaded", "error");
            });
        }
        else {
            toaster("Please fill all the details.", "error")
            setError("Please fill all the details.")
        }
        setIsLoading(false)

    };


    useEffect(() => {
        fileSelect();
    }, [img]);
    return (

        <Modal
            show={true}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Equipment
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container">
                    <div className="my-4">
                        <div className="row">
                            <div className="col-md-6 mb-4">
                                <div className="form-group">
                                    <label htmlFor="image" className="mb-3">Image :</label>
                                    {!preview ? (
                                        <div className="avatar"></div>
                                    ) : (
                                        <img src={preview || ""} className="avatar img-fluid mb-3" alt="" />
                                    )}
                                    <label htmlFor="upload-image" className="btn btn-primary">
                                        <CloudUploadIcon className="me-2" /> Upload Image
                                        <input
                                            id="upload-image"
                                            type="file"
                                            className="form-control visually-hidden"
                                            onChange={(e) => handleFile(e)}
                                        />
                                    </label>
                                </div>
                            </div>
                            <div className="col-md-6 mb-4">
                                <div className="form-group">
                                    <label htmlFor="name">Name :</label>
                                    <input
                                        id="name"
                                        type="text"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setname(e.target.value)}
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
                                        onChange={(e) => setdescription(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="city">Location :</label>
                                    <input
                                        id="city"
                                        type="text"
                                        className="form-control"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="category">Category :</label>
                                    <Select
                                        id="category"
                                        className="select"
                                        aria-label="category"
                                        options={equipmentCategories}
                                        onChange={(selectedOptions) =>
                                            setcategory(selectedOptions.value)
                                        }
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
                                            onChange={(e) => setrent(e.target.value)}
                                        />
                                        <select
                                            name=""
                                            id="timeduration"
                                            className="form-control yellow"
                                            value={timeduration}
                                            onChange={(e) => settimeduration(e.target.value)}
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
                                        value={dop}
                                        onChange={(e) => setdop(e.target.value)}
                                    />
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
                    onClick={handleSubmit}
                    disabled={isLoading}
                >
                    {isLoading ? "Loading ..." : "Add Product"}
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default UploadEquipment