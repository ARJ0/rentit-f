import React from 'react';
const JobItem = ({ title, locations, experience, responsibilities, positionName,
    isActive, toggleAccordion }) => {
    return (
        <li className={`job-item ${isActive ? 'active' : ''}`} onClick={() =>
            toggleAccordion()}>
            <div className="job-item-title">{title}</div>
            <div className={`job-item-content ${isActive ? 'active' : ''}`}>
                <div className="job-item-info">
                    <p><strong>Locations:</strong></p>
                    <ul>
                        {locations.map((location, index) => (
                            <li key={index}>{location}</li>
                        ))}
                    </ul>
                </div>
                <div className="job-item-info">
                    <p><strong>Experience:</strong></p>
                    <p className='job-item-info-exp'>{experience}</p>
                </div>
                <div className="job-item-info">
                    <p><strong>Responsibilities:</strong></p>
                    <ul className="job-item-responsibilities">
                        {responsibilities.map((responsibility, index) => (
                            <li key={index}>{responsibility}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </li>
    );
};
export default JobItem; 