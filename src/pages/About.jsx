import { Link } from 'react-router-dom';
import { FaReact, FaBootstrap, FaLinkedin, FaGithub } from "react-icons/fa";
import { TbBrandVite } from "react-icons/tb";

function About() {
    return (
        <div className="about-page">
            <div className="container text-center mb-5">
                <h1 className="display-3 fw-bold text-dark mb-2">
                    <i className="bi bi-heart-fill text-danger me-2"></i>
                        K<span className="text-danger">Drama Hub</span>
                </h1>
                <p className="text-muted fs-5">Discover your next favorite Korean drama</p>
            </div>

            <div className="container">
                
                <section className="mb-5 pb-5">
                    <div className="row align-items-center">

                        <div className="col-lg-6 mb-4 mb-lg-0" style={{textAlign: "justify"}}>
                            <h2 className="display-5 fw-bold mb-4">Our Story</h2>
                            <p className="text-muted fs-5 lh-lg mb-4">
                                KDrama Hub was born from a passion for Korean television and a desire to help fans 
                                discover their next binge-worthy series. We understand the struggle of finding 
                                quality dramas and keeping track of what you've watched.
                            </p>
                            <p className="text-muted fs-5 lh-lg mb-4">
                                Our platform brings together comprehensive information about thousands of Korean 
                                dramas, from timeless classics to the latest releases, all in one beautifully 
                                designed interface.
                            </p>
                        </div>

                        <div className="col-lg-6 mb-4 mb-lg-0 text-center">
                            <img 
                                src="https://mykdramaaddiction1.wordpress.com/wp-content/uploads/2019/01/kdrama.png" 
                                alt="KDrama" 
                                className="img-fluid rounded shadow"
                                style={{ maxHeight: '400px', objectFit: 'contain' }}
                            />
                        </div>
                    </div>
                </section>
                
                <section className="container" >
                    <h2 className="display-5 text-center fw-bold mb-4">Built with Love</h2>
                    <p className="text-muted fs-5 lh-lg mb-4" style={{textAlign: "center"}}>
                        KDrama Hub is powered by The Movie Database (TMDB) API, ensuring you get accurate 
                        and up-to-date information about your favorite shows. Our platform is built 
                        with modern web technologies for a fast, responsive experience.
                    </p>

                    <div className="d-flex align-items-center justify-content-center flex-wrap gap-2 fs-3">
                        <span className="badge text-dark border px-3 py-3"><FaReact /> React</span>
                        <span className="badge text-dark border px-3 py-3"><TbBrandVite  /> Vite</span>
                        <span className="badge text-dark border px-3 py-3"><FaBootstrap /> Bootstrap</span>
                        <span className="badge text-dark border px-3 py-3"><a href='https://www.themoviedb.org/' className="text-decoration-none text-dark fw-semibold" target="_blank" rel="noopener noreferrer">The Movie Database (TMDB) API</a></span>
                    </div>
                </section>
                
                <section className="text-center py-5">
                    <div className="py-5">
                        <h2 className="display-5 fw-bold mb-4">Ready to Discover?</h2>
                        <p className="text-muted fs-5 mb-4">
                            Start exploring thousands of Korean dramas today
                        </p>
                        <Link 
                            to="/" 
                            className="btn btn-danger btn-lg px-5 py-3 rounded-pill shadow"
                        >
                            <i className="bi bi-search me-2"></i>
                            Browse Dramas
                        </Link>
                    </div>
                </section>

                {/* <section className="text-center py-5 mb-5">
                    <div className="py-5">
                        <h2 className="display-5 fw-bold mb-4">Meet the Developer</h2>
                        <p className="text-muted fs-5 mb-4">
                            KDrama Hub was created by a passionate developer who loves K-dramas and building awesome web apps.
                        </p>
                        <div className="d-flex align-items-center justify-content-center flex-wrap gap-3">
                        <a
                            href="https://github.com/flor1211"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-dark d-flex align-items-center gap-2 px-4 py-2 shadow-sm rounded-pill"
                        >
                            <FaGithub size={24} /> GitHub
                        </a>

                        <a
                            href="https://www.linkedin.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary d-flex align-items-center gap-2 px-4 py-2 shadow-sm rounded-pill"
                        >
                            <FaLinkedin size={24} /> LinkedIn
                        </a>

                        <a
                            href="mailto:florenciojrrosales0011@gmail.com"
                            className="btn btn-outline-secondary d-flex align-items-center gap-2 px-4 py-2 shadow-sm rounded-pill"
                        >
                            <i className="bi bi-envelope-fill"></i> Email
                        </a>
                        </div>

                    </div>
                </section> */}
            </div>
        </div>
    );
}

export default About;