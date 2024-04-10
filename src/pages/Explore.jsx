import React, { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Row, Col } from "react-bootstrap";
import Select from "react-select";
import EquipmentCard from "../components/EquipmentCard";
import { getAllAndSearchEquipment } from "../services/actionCreator";
import { toaster } from "../services/toaster";
import { equipmentCategories, equipmentCategoriesTypeName } from "../services/helper";
import Loader from "../services/Loader";
import moment from "moment";
import EquipmentModal from "../components/EquipmentModal";

// import './test.scss'

const sortOp = [
  { label: "A-Z", value: 1 },
  { label: "Z-A", value: 2 },
  { label: "Low to High", value: 3 },
  { label: "High to Low", value: 4 },
]

const Explore = () => {
  const [equipment, setEquipment] = useState([]);
  const [category, setCategory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState(setTimeout(() => { }))
  const [sortBy, setSortBy] = useState()
  const [isOpen, setIsOpen] = useState(false);
  const [selecetedItem, setSelecetedItem] = useState(null)


  const openModal = (info) => {
    setIsOpen(true);
    setSelecetedItem(info)
  }
  const closeModal = () => {
    setIsOpen(false);
    setSelecetedItem(null);
    // get()

  }

  const getEquipment = (_searchTerm = null) => {
    setIsLoading(true);
    let req = {
      category
    };
    if (_searchTerm || searchTerm) {
      req.keyword = _searchTerm || searchTerm
    }
    if (sortBy) {
      req.sortBy = [3, 4].includes(sortBy.value) ? "rent" : "title";
      req.sortOrder = [1, 3].includes(sortBy.value) ? "asc" : "desc";
    }

    getAllAndSearchEquipment(req)
      .then((data) => {
        setIsLoading(false);
        setEquipment(data);
      })
      .catch((error) => {
        setIsLoading(false);
        toaster(error?.response?.data, 'error');
        console.log("err -=-= ", error);
      });
  };

  const changeCategories = (val) => {
    if (category.indexOf(val) !== -1) {
      setCategory(category.filter((cat) => cat !== val));
    } else {
      setCategory([...category, val]);
    }
  };
  const _getSearchData = (_searchTerm) => {
    setIsLoading(true);
    let req = {
      category
    };
    if (_searchTerm) {
      req.keyword = _searchTerm;
    }
    if (sortBy) {
      req.sortBy = [3, 4].includes(sortBy.value) ? "rent" : "title";
      req.sortOrder = [1, 3].includes(sortBy.value) ? "asc" : "desc";
    }

    getAllAndSearchEquipment(req)
      .then((data) => {
        setIsLoading(false);
        setEquipment(data);
      })
      .catch((error) => {
        setIsLoading(false);
        toaster(error?.response?.data, 'error');
        console.log("err -=-= ", error);
      });
  }

  const onSearchTextChanged = (e) => {
    clearTimeout(searchTimeout);
    const q = e.target.value;
    setSearchTerm(q);
    const timeout = setTimeout(() => {
      _getSearchData(q)
    }, 500)
    setSearchTimeout(timeout);
  }

  useEffect(() => {
    getEquipment();
  }, [category, sortBy]);
  return (
    <>
      <div className="page explore">
        {isLoading && <Loader />}
        <div className="top flex-col">
          <div className="w-100 d-flex align-items-center">
            <div className="input-group  justify-content-center">
              <input
                type="search"
                className="form-control"
                placeholder="Search equipment..."
                value={searchTerm}
                aria-label="Search equipment"
                onChange={onSearchTextChanged}
              />
              <span className="input-group-text">
                <SearchIcon sx={{ fontSize: 20 }} />
              </span>
            </div>
          </div>
          <div className="categories">
            <div className={`pill blue filterpill`}>
              <FilterAltIcon sx={{ fontSize: 30 }} />
            </div>
            <div className='pill' style={{ "min-width": "10%" }}>
              <Select
                className="select"
                options={sortOp}
                onChange={(e) => setSortBy(e)}
                aria-label="Sort options"
              />
            </div>
            {equipmentCategories.map((op) => (
              <button
                className={`pill ${category.includes(op.value) ? "blue" : "yellow"}`}
                onClick={() => {
                  changeCategories(op.value);
                }}
              >
                {op.label}
              </button>
            ))}
          </div>
        </div>
        <Row>
          {equipment.length > 0 ? equipment.map((info, index) => (
            <Col key={index} md={3} sm={6}>
              <div className="booking-card mt-5 text-capitalize" style={{ backgroundImage: `url(${info.image})` }}>
                <div className="book-container">
                  <div className="content">
                    <button className="btn" onClick={() => openModal(info)} disabled={info.unavailableUntil ? true : false}>Add To Bag</button>
                  </div>
                </div>
                <div className="informations-container">
                  <h2 className="title text-capitalize">{info.title}</h2>
                  <p className="sub-title">{equipmentCategoriesTypeName[info.category]}</p>
                  <p className="price">
                    <svg className="icon" style={{ width: "24px", height: "24px" }} viewBox="0 0 24 24">
                      <path fill="currentColor" d="M3,6H21V18H3V6M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M7,8A2,2 0 0,1 5,10V14A2,2 0 0,1 7,16H17A2,2 0 0,1 19,14V10A2,2 0 0,1 17,8H7Z" />
                    </svg>
                    ${info.rent.toFixed(2)} {info.timeperiod}
                  </p>
                  <div className="more-information">
                    <div className="info-and-date-container text-capitalize">
                      {info.unavailableUntil ? (
                        <div className="box date" style={{ color: '#ff0000' }}>
                          <svg className="icon" style={{ width: "24px", height: "24px" }} viewBox="0 0 24 24">
                            <path fill="currentColor" d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z" />
                          </svg>
                          <p>{`Sorry, this equipment is currently unavailable. Until ${moment(info.unavailableUntil).format('LL')}`}</p>
                        </div>
                      ) : (
                        <div className="box date">
                          <svg className="icon" style={{ width: "24px", height: "24px" }} viewBox="0 0 24 24">
                            <path fill="currentColor" d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z" />
                          </svg>
                          <p>This equipment is available for booking.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          )) : (
            <div className="flex-col">
              No Equipment
            </div>
          )}
        </Row>
      </div>

      {isOpen && selecetedItem &&
        <EquipmentModal closeModal={closeModal} selecetedItem={selecetedItem} />
      }
    </>
  );
};

export default Explore;
