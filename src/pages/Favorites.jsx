import { useDramaContext } from "../context/DramaContext";
import DramaCard from "../components/DramaCard";

function Favorites() {
    const { favorites } = useDramaContext();

    if (favorites && favorites.length > 0) {
        return (
            <div className="container py-5">
                <div className="mb-5">
                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                        <div>
                            <h1 className="display-5 fw-bold text-dark mb-2">
                                <i className="bi bi-heart-fill text-danger me-3"></i>
                                Your Favorites
                            </h1>
                            <p className="text-muted fs-5 mb-0">
                                You have {favorites.length} {favorites.length === 1 ? 'drama' : 'dramas'} in your collection
                            </p>
                        </div>
                        
                    </div>
                    <hr className="my-4" />
                </div>


                <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
                    {favorites.map((drama) => (
                        <DramaCard drama={drama} key={drama.id} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div 
                className="d-flex flex-column align-items-center justify-content-center text-center" 
                style={{ minHeight: "70vh" }}
            >
                <div 
                    className="mb-4 rounded-circle bg-light d-flex align-items-center justify-content-center"
                    style={{ width: "120px", height: "120px" }}
                >
                    <i className="bi bi-heart text-muted" style={{ fontSize: "3.5rem" }}></i>
                </div>

                <h2 className="fw-bold text-dark mb-3">
                    No Favorite Dramas Yet
                </h2>
                <p className="text-muted fs-5 mb-4" style={{ maxWidth: "500px" }}>
                    Start building your collection by clicking the heart icon on dramas you love!
                </p>

                <a 
                    href="/" 
                    className="btn btn-danger btn-lg px-5 py-3 rounded-pill shadow-sm"
                    style={{ 
                        transition: "all 0.3s ease",
                        fontWeight: "600"
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 8px 16px rgba(220, 53, 69, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
                    }}
                >
                    <i className="bi bi-search me-2"></i>
                    Discover Dramas
                </a>
            </div>
        </div>
    );
}

export default Favorites;