import React from 'react'
import logo from '../logo.svg'
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import GoogleIcon from '@mui/icons-material/Google';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
  return (

    <footer className="text-center text-lg-start bg-body-tertiary text-light">

      <section className="brand-bg">
        <div className="container text-center text-md-start mt-5">

          <div className="row mt-3">

            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4 mt-5">

              <span className="text-uppercase fw-bold mb-4">
                <img src={logo} alt="My SVG" fill="" />
              </span>
              <p>
                UNLEASH THE POWER OF SMART RENTALS
              </p>
            </div>



            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4 mt-5">

              <h6 className="text-uppercase fw-bold mb-4">
                Company
              </h6>
              <p>
                <a href="/AboutUs" className="text-reset text-decoration-none">About Us</a>
              </p>
              <p>
                <a href="/FAQ" className="text-reset text-decoration-none">FAQs</a>
              </p>
              <p>
                <a href="/Careers" className="text-reset text-decoration-none">Careers</a>
              </p>
              <p>
                <a href="/ContactUs" className="text-reset text-decoration-none">Contact</a>
              </p>
            </div>

            <div className="col-md-4 col-lg-4 col-xl-4 mx-auto mb-4 mt-5">
              <div className='mt-5'>
              <a
                className="btn text-white btn-floating m-1"
                style={{ "background-color": "#3b5998" }}
                href="http://www.facebook.com/" target="_blank"
                aria-label="FacebookIcon"
              ><FacebookIcon /></a>

              <a
                className="btn text-white btn-floating m-1"
                style={{ "background-color": "#55acee" }}
                href="http://www.twitter.com/" target="_blank"
                aria-label="x"
              ><XIcon /></a>

              <a
                className="btn text-white btn-floating m-1"
                style={{ "background-color": "#dd4b39" }}
                href="http://www.gmail.com/" target="_blank"
                 aria-label="GoogleIcon"
              ><GoogleIcon /></a>

              <a
                className="btn text-white btn-floating m-1"
                style={{ "background-color": "#ac2bac" }}
                href="http://www.instagram.com/" target="_blank"
                 aria-label="InstagramIcon"
              ><InstagramIcon /></a>
              <a
                className="btn text-white btn-floating m-1"
                style={{ "background-color": "#0082ca" }}
                href="https://www.linkedin.com/" target="_blank"
                 aria-label="LinkedInIcon"
              ><LinkedInIcon /></a>
              <a
                className="btn text-white btn-floating m-1"
                style={{ "background-color": "#333333" }}
                href="https://github.com/" target="_blank"
                 aria-label="GitHubIcon"
              ><GitHubIcon /></a></div>
              <div className="" style={{"margin-top": "15%"}}>
        © 2024 Rentit. All Rights Reserved.
      </div>
            </div>
            
          </div>

        </div>
      </section>



      
    </footer>
  )
}

export default Footer
