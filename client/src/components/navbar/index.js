import React, { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Navbar() {
    const [activeLocation, setActiveLocation] = useState("/");

    useEffect(() => {
        setActiveLocation(window.location.pathname);
    }, []);

    return (
        <nav className="navbar">
            <div className="navbar-branding">
                <Link
                    to="/"
                    className="navbar-brand"
                >
                    Google Books
                </Link>
            </div>
            <ul className="nav-list">
                <li className={
                        activeLocation === '/Search'
                            ? 'nav-item active'
                            : 'nav-item'
                    }>
                    <Link
                        to="/Search"
                        className={
                            activeLocation === '/Search'
                                ? 'nav-link active'
                                : 'nav-link'
                        }
                    >
                        Search
                    </Link>
                </li>
                <span className="nav-spacer">|</span>
                <li className={
                        activeLocation === '/Saved'
                            ? 'nav-item active'
                            : 'nav-item'
                    }>
                    <Link
                        to="/Saved"
                        className={
                            activeLocation === '/Saved'
                                ? 'nav-link active'
                                : 'nav-link'
                        }
                    >
                        Saved
                    </Link>
                </li>
            </ul>
        </nav>
    );
}


export default Navbar;
