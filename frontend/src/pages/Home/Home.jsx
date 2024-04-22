import React from 'react';
import './Home.css';
import Img from "../../images/illustration-1.svg"
import image from "../../images/illustration-2.svg"
import logo from "../../images/logo.png"
import phone from "../../images/icon-phone.svg"
import email from "../../images/icon-email.svg"
function Home() {
    return (
        <>
            <main>
                <section className="main-1">
                    <div className="container">
                        <div className="row">
                            <img src={Img} alt=""/>
                            <div className="info">
                                <h1>Capture Ideas Instantly</h1>
                                <p>Welcome to Note Hub, your centralized spot for jotting down thoughts and organizing
                                information
                                swiftly and efficiently, jot down notes, and consolidate your knowledge with seamless
                                organization.</p>
                                <a href="/register" className="styled-button">Get Started</a>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="main-2">
                    <div className="container">
                        <div className="row">
                            <img src={image} alt=""/>
                            <div className="info">
                                <h2>Stay productive, wherever you are</h2>
                                <p>Never let location be an issue when accessing your files. Note Hub has you covered for
                                    all of your
                                    file storage needs.</p>
                                <p>Securely share files and folders with friends, family and colleagues for live
                                    collaboration. No email
                                    attachments required!</p>
                                <a href="/register" className="styled-button">See how Note Hub works</a>
                                <div className="quote">
                                    <i className="fa fa-quote-left fa-1x"></i>
                                    <p>Note Hub has improved our team productivity by an order of magnitude. Since making
                                        the switch our
                                        team has become a well-oiled collaboration machine.</p>
                                    <div className="founder">
                                        <img src="https://cdn.profoto.com/cdn/053149e/contentassets/d39349344d004f9b8963df1551f24bf4/profoto-albert-watson-steve-jobs-pinned-image-original.jpg?width=1280&quality=75&format=jpg" alt=""/>
                                        <div className="details">
                                            <strong>Steve Jobs</strong>
                                            <strong>Founder & CEO, Apple</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="cta">
                    <div className="container">
                        <div className="info">
                            <h2>Get early access today</h2>
                            <p>It only takes a minute to sign up and our free starter tier is extremely generous. If you
                                have any
                                questions, our support team would be happy to help you.</p>
                        </div>
                    </div>
                </section>

                <div className="footer">
                    <div className="container">
                        <img src={logo} alt=""/>
                        <div className="footer-content">
                            <div className="col">
                                <div>
                                    <img src={phone} alt=""/>
                                    <p>Phone: +1-878-157-123</p>
                                </div>
                                <div>
                                    <img src={email} alt=""/>
                                    <p>notehub@gmail.com</p>
                                </div>
                            </div>
                            <div className="col">
                                <a href="#">Contact Us</a>
                                <a href="#">Terms</a>
                                <a href="#">Privacy</a>
                            </div>
                            <div className="col"></div>
                            <div className="col">
                                <a href="#"><i className="fa fa-facebook-f" aria-hidden="true"></i>Facebook</a>
                                <a href="#"><i className="fa fa-twitter" aria-hidden="true"></i>Twitter</a>
                                <a href="#"><i className="fa fa-instagram" aria-hidden="true"></i>Instagram</a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Home;
