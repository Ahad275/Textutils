import React from 'react';
import './footer.css'; // Import the CSS file for the Footer component

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    {/* About Us Section */}
                    <div id="about" className="footer-section about-us">
                        <h3>About Us</h3>
                        <p>TextUtil is a powerful text manipulation tool. Our mission is to offer the best experience for analyzing and transforming text. Whether you need to convert case, count words, or remove extra spaces, TextUtil has you covered.</p>
                    </div>

                    {/* Contact Information Section */}
                    <div id="contact" className="footer-section contact-info">
                        <h3>Contact Information</h3>
                        <p>Email: support@textutil.com</p>
                        <p>Phone: +1 (555) 123-4567</p>
                        <p>Follow us on social media:</p>
                        <ul>
                            <li><a href="https://twitter.com/textutil" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                            <li><a href="https://facebook.com/textutil" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                            <li><a href="https://linkedin.com/company/textutil" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
