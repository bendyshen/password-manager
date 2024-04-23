import axios from 'axios';
import Navbar from './Navbar';
import './HomePage.css'
export default function HomePage() {
    return (
        <div className="homepage">
            <Navbar />
            <div className="content">
            <div class="product-description">
                <h2>Welcome to Safeper!</h2>
                <p>
                    At Safeper, we understand the importance of your digital security. That's why we've developed a state-of-the-art password manager that simplifies your digital life without compromising on security. Whether you're an individual looking to manage your personal accounts or a professional handling multiple sensitive details, Safeper is designed to meet your needs.
                </p>
                <p>
                    Our password manager offers robust protection of all your passwords are stored. With Safeper, you can generate strong and unique passwords for each site and service you use, reducing your vulnerability to cyber attacks. Our user-friendly interface allows you to access your passwords quickly and securely from any device, anywhere in the world.
                </p>
                <p>
                    Safeper also supports password sharing with trusted individuals or team members in a secure manner. This feature is particularly useful for teams managing shared accounts without the risk of exposing sensitive information. Our commitment to privacy ensures that only you and those you trust can access them.
                </p>
                <p>
                    Upgrade your digital security today with KeyKeeper and experience peace of mind knowing your online identities are protected with the best security practices available. Join thousands of satisfied users who trust KeyKeeper to safeguard their passwords and digital lives.
                </p>
                <p>
                    Get started now and take the first step towards a safer, more secure digital experience with Safeper!
                </p>
            </div>
                <div className="creators">
                    <footer>
                        <span>Created by: </span><span> Yuan Shen </span>
                    </footer>

                </div>
            </div>
        </div>
    );
}