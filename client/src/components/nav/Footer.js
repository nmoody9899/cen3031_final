import React from "react";
import { AiFillTwitterSquare } from 'react-icons/ai';
import { AiFillInstagram } from 'react-icons/ai';
import { IoIosMail } from 'react-icons/io';

const Footer = () => (



    <div className="cc-footer">
        <hr className="footer-divide"></hr>


        <div className="divider"></div>
        <div className="container">
            <div className="row py-4 d-flex align-items-center">
                {/*Column 1*/}
                <div className="col-md-16 col-sm-24 text center">
                    <h5 className="disclaimer">Disclaimer</h5>

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
                            <a href="https://twitter.com/ConsiderHerbs">
                                <AiFillTwitterSquare> </AiFillTwitterSquare>
                            </a>
                            <a href="https://www.instagram.com/considerherbs/">
                                <AiFillInstagram> </AiFillInstagram>
                            </a>

                        </div>
                    </div>

                </div>
            </div>
            {/* Footer Bottom*/}
        </div>
        <hr className="last-divider"></hr>
        <div className="container">
            <div className="row py-4 d-flex align-items-center">
                <div className="Footer-Bottom">
                    <p className="text-xxs-center">
                        &copy;{new Date().getFullYear()} Consider Herbs - All Rights Reserved
                </p>
                </div>
            </div>
        </div>
    </div>





);

export default Footer;


