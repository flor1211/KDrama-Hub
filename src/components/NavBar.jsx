import { Link, useLocation } from "react-router-dom"

function NavBar() {
    const location = useLocation();
    
    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
            <div className="container">

                <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
                    <i className="bi bi-heart-fill text-danger me-2" style={{ fontSize: "1.5rem" }}></i>
                    <span style={{ fontSize: "1.5rem", letterSpacing: "-0.5px" }}>
                        K<span className="text-danger">Drama Hub</span>
                    </span>
                </Link>

                <button
                    className="navbar-toggler border-0 shadow-none"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-lg-center gap-1">
                        <li className="nav-item">
                            <Link 
                                className={`nav-link px-3 py-2 rounded ${
                                    isActive('/') 
                                        ? 'bg-danger text-white fw-semibold' 
                                        : 'text-dark fw-medium'
                                }`}
                                to="/"
                                style={{ 
                                    transition: "all 0.3s ease"
                                }}
                            >
                                <i className="bi bi-house-door me-2"></i>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className={`nav-link px-3 py-2 rounded ${
                                    isActive('/favorites') 
                                        ? 'bg-danger text-white fw-semibold' 
                                        : 'text-dark fw-medium'
                                }`}
                                to="/favorites"
                                style={{ 
                                    transition: "all 0.3s ease"
                                }}
                            >
                                <i className="bi bi-heart me-2"></i>
                                Favorites
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className={`nav-link px-3 py-2 rounded ${
                                    isActive('/about') 
                                        ? 'bg-danger text-white fw-semibold' 
                                        : 'text-dark fw-medium'
                                }`}
                                to="/about"
                                style={{ 
                                    transition: "all 0.3s ease"
                                }}
                            >
                                <i className="bi bi-info-circle me-2"></i>
                                About
                            </Link>
                        </li>
                    </ul>
                </div>

            </div>
        </nav>
    )
}

export default NavBar