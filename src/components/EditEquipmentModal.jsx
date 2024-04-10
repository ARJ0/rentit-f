import React, { useEffect, useState } from 'react'
import Select from "react-select";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import firebaseUpload from '../services/firbaseUpload';
import Modal from 'react-bootstrap/Modal';
import { toaster } from '../services/toaster';
import { useNavigate } from 'react-router-dom';
import { addEquipment, editEquipment } from '../services/actionCreator';
import { equipmentCategories } from '../services/helper';
import Loader from '../services/Loader';

const EditEquipmentModal = ({closeModal, selecetedItem}) => {

    const {_id, title, category, rent, available, image, location, timeperiod, borrowerid, description, age} = selecetedItem;

    const navigate = useNavigate();
    const [img, setImg] = useState(image);
    const [preview, setPreview] = useState();
    const [name, setname] = useState(title ?? null);
    const [_description, setdescription] = useState(description);
    const [_category, setCategory] = useState(category);
    const [_rent, setrent] = useState(rent);
    const [_timeduration, settimeduration] = useState(timeperiod);
    const [dop, setdop] = useState(age);
    const [city, setCity] = useState(location);
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
            name && _description && _category && _rent && _timeduration && dop && img
        ) {
            const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
            setIsLoading(true);


            await firebaseUpload(img, name, async (img_url) => {
                const reqBody = {
                    title: name,
                    description: _description,
                    age: dop,
                    rent: _rent,
                    timeperiod: _timeduration,
                    category: _category,
                    image: img_url?.data || image,
                    location: city,
                    currUserId: loggedUser?._id ?? "",
                    equipmentId: _id
                };
                editEquipment(reqBody).then((data) => {
                    navigate('/your-equipment')
                    toaster(data?.message, "success")
                    closeModal(true)
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
                    {isLoading&& <Loader/>}
                    <div className="my-4">
                        <div className="row">
                            <div className="col-md-6 mb-4">
                                <div className="form-group">
                                    <label for="image" className="mb-3">Image :</label>
                                    {!preview ? (
                                        <div className="avatar"></div>
                                    ) : (
                                        <img src={ preview || ""} className="avatar img-fluid mb-3" alt="" />
                                    )}
                                    <label htmlFor="image" className="btn btn-primary">
                                        <CloudUploadIcon className="me-2" /> Upload Image
                                        <input
                                           id="image"
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
                                        value={_description}
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
                                            setCategory(selectedOptions.value)
                                        }
                                        value={equipmentCategories.find((cat) => cat.value === category)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="rent">Rent :</label>
                                    <div className="input-group">
                                        <input
                                            id="rent"
                                            type="number"
                                            className="form-control"
                                            value={_rent}
                                            onChange={(e) => setrent(e.target.value)}
                                        />
                                        <select
                                            name=""
                                            id="timeduration"
                                            className="form-control yellow"
                                            value={_timeduration}
                                            onChange={(e) => settimeduration(e.target.value)}
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
                <button className='btn btn-light' onClick={() => closeModal(false)}>Close</button>
                <button
                    className="btn btn-primary blue"
                    onClick={handleSubmit}
                    disabled={isLoading}
                >
                    {isLoading ? "Loading ..." : "Edit Product"}
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditEquipmentModal