import { Link, NavLink } from "react-router-dom";

const Footer = () => {

    return (
        <div className="py-10">
            <footer className="footer footer-center p-5">
                <aside>
                    <p className="font-bold py-1">
                    CrimeLens<br />
                    </p>
                    <p>CrimeLens</p>
                    <div>
                        <NavLink className='hover:text-blue-400' to={"/TOS"}>Policies / Terms And Conditions</NavLink> {/* Link to Policies/TOS */}
                        <br/>
                        <NavLink className='hover:text-blue-400'to={"/FAQ"}>FAQ</NavLink> {/* Link to FAQ*/}
                    </div>
                </aside>
                <nav>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;