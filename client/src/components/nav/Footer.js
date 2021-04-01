import React from "react";
import { AiFillTwitterSquare } from 'react-icons/ai';
import { AiFillInstagram } from 'react-icons/ai';
import { IoIosMail } from 'react-icons/io';
import Logo from "../../images/considerherbs.jpg";


const Footer = () => (

    <div className="cc-footer">
        <hr className="footer-divide"></hr>

        <div className="row py-3">
            <div className="the-row-container1">
                <div className="col">
                    <img src={Logo} width="210px" height="60px" />
                </div>

                <div className="col-10">
                    <span className="disclaimer">
                        <h4>Disclaimer</h4></span>
                    <p>The information presented herein by Consider Herbs is intended for educational purposes only.
                    These statements have not been evaluated by the FDA and are not intended to diagnose, cure,
                    treat or prevent disease. Individual results may vary, and before using any supplements, it is always advisable to
                        consult with your own healthcare provider.</p>
                    <h5>Contact</h5>
                    <div id="email-icon-container">
                        <IoIosMail></IoIosMail>
                        <span className="email-icon">Dee@ConsiderHerbs.com</span>
                    </div>
                    <div className="icon-container">
                        <div id="twitter-icon-container">
                            <a href="https://twitter.com/ConsiderHerbs" target="_blank" rel="noopener noreferrer">
                                <AiFillTwitterSquare> </AiFillTwitterSquare>
                            </a>
                            <a href="https://www.instagram.com/considerherbs/" target="_blank" rel="noopener noreferrer">
                                <AiFillInstagram> </AiFillInstagram>
                            </a>

                        </div>
                    </div>
                </div>
            </div>


        </div>
        <hr className="last-divider"></hr>

        <div className="row">
            <div className="col">
                <div className="copywrite-container">
                    <p className="text-xxs-center"  >
                        &copy;{new Date().getFullYear()} Consider Herbs - All Rights Reserved
            </p>
                </div>
            </div>
        </div>


    </div>


);

export default Footer;

