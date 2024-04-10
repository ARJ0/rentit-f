import { faqData } from '../services/faqData'; // Assuming faqData contains FAQ items
import '../css/faq.css';
import { useState } from 'react';
const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const handleAccordionClick = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };
    return (
        <main>
            <div className="banner">
                <h1>Frequently Asked Questions</h1>
            </div>
            <div className="faq-list">
                {faqData.map((item, index) => (
                    <div className={`faq-item ${activeIndex === index ? 'active'
                        : ''}`} key={index}>
                        <div className="faq-item-header" onClick={() =>
                            handleAccordionClick(index)}>
                            <h3>{item.question}</h3>
                        </div>
                        <div className="faq-item-content">
                            <p>{item.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};
export default FAQ; 