import React from 'react'
import '../css/ContactUs.css'
import PlaceIcon from '@mui/icons-material/Place';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const ContactUs = () => {
    return (
        <div className="container-contact-us container page ">
            <div className="content-contact-us">
                <div className="left-side">
                    <div className="address details">
                        <div className='brand-color-text'><PlaceIcon sx={{ fontSize: 50 }} /> </div>
                        <div className="topic">Address</div>
                        <div className="text-one">98 King St EToronto</div>
                        <div className="text-two">ON M5C 1G6, Canada</div>

                    </div>
                    <div className="phone details">
                        <div className='brand-color-text'><LocalPhoneIcon sx={{ fontSize: 50 }} /> </div>
                        <div className="topic">Phone</div>
                        <div className="text-one">+1 989 355 6472</div>
                    </div>
                    <div className="email details">
                        <div className='brand-color-text'> <MailOutlineIcon sx={{ fontSize: 50 }} /> </div>
                        <div className="topic">Email</div>
                        <div className="text-one">careers.rentit@gmail.com.</div>
                    </div>
                </div>
                <div className="right-side">
                    <div className="topic-text">Send us a message</div>
                    <p>If you have any work from me or any types of quries related to my tutorial, you can send me message from here. It's my pleasure to help you.</p>
                    <form action="#">
                        <div className="input-box">
                            <input type="text" placeholder="Enter your name" aria-label="Enter your name" />
                        </div>
                        <div className="input-box">
                            <input type="text" placeholder="Enter your email"  aria-label="Enter your email"/>
                        </div>
                        <div className="input-box message-box">
                            <textarea placeholder='Message..' rows="4" cols="50" aria-label="Message" />
                        </div>
                        <div className="button brand-bg">
                            <input type="button" value="Send Now"  aria-label="Send Now" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ContactUs