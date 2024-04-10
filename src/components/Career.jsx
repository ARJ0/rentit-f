import React, { useState } from 'react';
import JobItem from './JobItem';
import '../css/Career.css';
import jobsData from '../services/jobsData.js';
const Career = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };
    return (
        <main>
            <div className="banner">
                <h1>Welcome to Our Career Opportunities</h1>
                <p>Explore our current job openings and join our team!</p>
            </div>
            <section className="job-listing">
                <h2>Current Job Openings</h2>
                <ul>
                    {jobsData.map((job, index) => (
                        <JobItem
                            key={index}
                            title={job.title}
                            locations={job.locations}
                            experience={job.experience}
                            responsibilities={job.responsibilities}
                            positionName={job.positionName}
                            isActive={activeIndex === index}
                            toggleAccordion={() => toggleAccordion(index)}
                        />
                    ))}
                </ul>
            </section>
            <h2>Why Join Us?</h2>
            <div className='join-us'>
                <ul>
                    <li>Competitive salary and benefits package</li>
                    <li>Opportunities for career growth and advancement</li>
                    <li>Collaborative and innovative work environment</li>
                    <li>Training and development programs</li>
                    <li>Employee wellness initiatives</li>
                </ul>
            </div>
            <div class="mailto">
                <h2>How to Apply</h2>
                <p>If you are interested in joining our team, please send your resume and
                    cover letter to <a href="mailto:careers.rentit@gmail.com" class="mailtolink">careers.rentit@gmail.com</a>.</p>
            </div>
        </main>
    );
};
export default Career;