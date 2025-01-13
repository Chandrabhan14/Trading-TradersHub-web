import React from "react";
import NavTop from "../components/nav/NavTop";
import AboutFooter from "../components/footer/AboutFooter";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";


function PrivacyPolicyPage() {
    return (
        <>
            <>
                <Helmet>
                    <title>
                        Terms and Conditions: Your Guide to Transparent Trading Policies
                    </title>
                    <meta name="description"
                        content="Explore our terms and conditions to ensure a transparent and secure trading experience. Understand the guidelines governing our platform, covering everything from user responsibilities to service agreements. Trust in our commitment to fair and ethical trading practices."
                    />
                </Helmet>
                <div>
                    <NavTop />
                </div>
                <section className="container-fluid other_page_hero_Section_hp">
                    <div className="container">
                        <div className="breadcrumb-title text-center" data-aos="zoom-in-up">
                            <h2 className="font-weight-bold">
                                Privacy Policy
                            </h2>
                            <div className="bread-come">
                                <nav aria-label="breadcrumb ">
                                    <ol className="list-unstyled d-flex flex-wrap p-0 mb-0 justify-content-center">
                                        <li className="breadcrumb-items">
                                            <Link to="/" className="text-light text-decoration-none">
                                                Home
                                            </Link>
                                            <i className="ti-angle-right" aria-hidden="true"></i>
                                        </li>

                                        <li className="breadcrumb-items mr-2">
                                            <i className="fa-solid fa-angle-right text-white"></i>
                                        </li>

                                        <li className="breadcrumb-items">
                                            <a className="font-weight-bold text-white text-decoration-none">
                                                {" "}
                                                Privacy Policy{" "}
                                            </a>
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="container-fluid my-5 PrivacyPolicy_contect_Area">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">



                                <div className=" mt-4">
                                    <p>
                                        Tradershub.ninja ("we," "us," or "our") operates the https://tradershub.ninja website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
                                    </p>
                                </div>

                                <div className=" mt-4">
                                    <h4>Information We Collect </h4>
                                    <p>
                                        We collect several different types of information for various purposes to improve our Service to you.
                                    </p>
                                </div>

                                <div className=" mt-4">
                                    <h4>Personal Data</h4>
                                    <p>
                                        While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:
                                    </p>
                                    <ul>
                                        <li>Email address</li>
                                        <li>First name and last name</li>
                                        <li>Phone number</li>
                                        <li>Usage Data</li>
                                    </ul>
                                </div>

                                <div className=" mt-4">
                                    <h4>Usage Data</h4>
                                    <p>
                                        We may also collect information about how you access and use the Service ("Usage Data"). This Usage Data may include information such as your device type, operating system, IP address, browsing times, pages viewed, and other diagnostic data.
                                    </p>
                                </div>

                                <div className=" mt-4">
                                    <h4>Use of Your Data</h4>
                                    <p>Tradershub.ninja uses the collected data for various purposes:</p>

                                    <ul>
                                        <li>To provide and maintain the Service</li>
                                        <li>To notify you about changes to our Service</li>
                                        <li>To allow you to participate in certain interactive features of our Service when you choose to do so</li>
                                        <li>To provide customer support</li>
                                        <li>To gather analysis or valuable information so that we can improve the Service</li>
                                        <li>To detect, prevent, and address technical issues</li>
                                        <li>To comply with any legal obligations</li>
                                    </ul>
                                </div>

                                <div className=" mt-4">
                                    <h4>Disclosure of Your Data</h4>
                                    <p>
                                        Tradershub.ninja may disclose your Personal Data in the good faith belief that such action is necessary to:
                                    </p>
                                    <ul>
                                        <li>To comply with a legal obligation</li>
                                        <li>To protect and defend the rights or property of Tradershub.ninja</li>
                                        <li>To prevent or investigate possible wrongdoing in connection with the Service</li>
                                        <li>To protect the personal safety of users of the Service or the public</li>
                                    </ul>
                                </div>

                                <div className=" mt-4">
                                    <h4>Security of Your Data</h4>
                                    <p>
                                        The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
                                    </p>
                                </div>

                                <div className=" mt-4">
                                    <h4>Children's Privacy</h4>
                                    <p>
                                        Our Service does not address anyone under the age of 13 ("Children"). We do not knowingly collect personally identifiable information from children. If you are a parent or guardian and you are aware that your Child has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from Children without verification of parental consent, we take steps to remove that information from our servers.
                                    </p>
                                </div>

                                <div className=" mt-4">
                                    <h4>Changes to This Privacy Policy</h4>
                                    <p>
                                        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                                    </p>
                                    <p>
                                        You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when posted on this page.
                                    </p>
                                </div>

                                <div className="mt-4">
                                    <h4>Contact Us</h4>
                                    <p>
                                        If you have any questions about this Privacy Policy, please contact us:
                                    </p>
                                    <p>
                                        By email: marketing@tradershub.ninja
                                    </p>
                                </div>


                                <strong className="text-white mt-5">Update Date :  10 May, 2024</strong>
                            </div>
                        </div>
                    </div>
                </div>
                     <div>
                    <AboutFooter />
                </div>
            </>
        </>
    )
}

export default PrivacyPolicyPage