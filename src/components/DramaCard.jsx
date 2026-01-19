import "../css/DramaCard.css";
import { useNavigate } from 'react-router-dom';
import { useDramaContext } from "../context/DramaContext";

function DramaCard({drama}) {

    const navigate = useNavigate();

    const {isFavorite, addToFavorites, removeFromFavorites} = useDramaContext()
    const favorite = isFavorite(drama.id)

    function onFavoriteClick(e) {
        if (favorite) removeFromFavorites(drama.id)
        else addToFavorites(drama)
    }

    const handleCardClick = () => {
        navigate(`/drama/${drama.id}`);
    }


    return (
    <div className="col">
        <div className="card border-1 shadow-sm overflow-hidden drama-card position-relative" 
            style={{ cursor: "pointer", transition: "transform 0.3s ease, box-shadow 0.3s ease" }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
            }}
            onClick={(e) => {
                e.preventDefault();
                handleCardClick()
            }}
        >
            <div className="position-relative overflow-hidden">
                <img
                    src={`https://image.tmdb.org/t/p/w500${drama.poster_path}`}
                    className="card-img-top"
                    alt={drama.name}
                    style={{ 
                        // height: "400px", 
                        // objectFit: "cover",
                        objectFit: "cover",
                        width: "100%",
                        transition: "transform 0.3s ease"
                    }}
                    onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
                    onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                />
                
                <div className="position-absolute bottom-0 start-0 w-100" style={{
                        height: "50%",
                        background: "linear-gradient(to top, rgba(18, 18, 18, 0.8), transparent)"
                    }}>
                        
                </div>

                <button
                    className={`btn position-absolute top-0 end-0 m-3 rounded-circle border-0 shadow ${
                        favorite ? "btn-danger" : "btn-light bg-white"
                    }`}
                    style={{ 
                        width: "40px", 
                        height: "40px",
                        transition: "all 0.2s ease",
                        opacity: 0.95
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        onFavoriteClick();
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.1)";
                        e.currentTarget.style.opacity = "1";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.opacity = "0.95";
                    }}
                >
                    <i className={`bi bi-heart${favorite ? "-fill" : ""} ${favorite ? "text-white" : "text-danger"}`}></i>
                </button>

                {drama.vote_average && (
                    <div 
                        className="position-absolute top-0 start-0 m-3 badge bg-dark text-white px-3 py-2 rounded-pill shadow"
                        style={{ fontSize: "0.85rem", fontWeight: "600" }}
                    >
                        <i className="bi bi-star-fill text-warning me-1"></i>
                        {drama.vote_average.toFixed(1)}
                    </div>
                )}
            </div>

            <div className="card-body p-3 bg-white">
                <h6 className="card-title fw-bold mb-1 text-dark" style={{ 
                    display: "-webkit-box",
                    WebkitLineClamp: "2",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    lineHeight: "1.4"
                }}>
                    {drama.name}
                </h6>

                <div className="d-flex justify-content-between align-items-center">
                    {drama.original_name && drama.original_name !== drama.name ? (
                        <p className="text-muted mb-0 flex-grow-1" style={{ 
                            fontSize: "0.85rem",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap"
                        }}>
                            {drama.original_name}
                        </p>
                    ) : <div></div>}
                    
                    <span className="badge bg-danger-subtle text-danger px-2 py-1 ms-2" style={{ fontSize: "0.75rem" }}>
                        {drama.first_air_date?.split("-")[0] || "N/A"}
                    </span>
                </div>
            </div>
        </div>
    </div>

    )
}

export default DramaCard