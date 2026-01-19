import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDramaContext } from '../context/DramaContext';
import { getDramaDetails } from "../services/api";


function DramaDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { favorites, addToFavorites, removeFromFavorites } = useDramaContext();
    const [drama, setDrama] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const isFavorite = favorites?.some(fav => fav.id === parseInt(id));

    const getStatus = (status) => {
        switch (status) {
            case "Ended":
                return "Completed";
            case "Returning Series":
                return "Ongoing";
            default:
                return status;
        }
    };

    useEffect(() => {
        const fetchDramaDetails = async () => {
            try {
                const data = await getDramaDetails(id)
                setDrama(data);
            } catch (err) {
                console.log(err);
                setError("Failed to load details...");
            } finally {
                setLoading(false);
            }
        };

        fetchDramaDetails();
    }, [id]);

    const handleFavoriteToggle = () => {
        if (isFavorite) {
            removeFromFavorites(drama.id);
        } else {
            addToFavorites(drama);
        }
    };

    if (loading) {
        return (
            <div className="container text-center py-5" style={{ minHeight: '80vh' }}>
                <div className="spinner-border text-danger" role="status" style={{ width: '3rem', height: '3rem' }}>
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3 text-muted">Loading drama details...</p>
            </div>
        );
    }

    if (error || !drama) {
        return (
            <div className="container text-center py-5" style={{ minHeight: '80vh' }}>
                <i className="bi bi-exclamation-triangle text-danger" style={{ fontSize: '4rem' }}></i>
                <h2 className="mt-4">Oops! Something went wrong</h2>
                <p className="text-muted">{error || 'Drama not found'}</p>
                <button className="btn btn-danger mt-3" onClick={() => navigate('/')}>
                    <i className="bi bi-house-door me-2"></i>
                    Go Home
                </button>
            </div>
        );
    }

    return (
        <div className="drama-details">
            <div 
                className="position-relative text-white"
                style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.8)), url(https://image.tmdb.org/t/p/original${drama.backdrop_path || drama.poster_path})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '500px'
                }}
            >
                <div className="container py-5">
                    <button 
                        className="btn btn-light btn-sm mb-4 rounded-pill"
                        onClick={() => navigate(-1)}
                    >
                        <i className="bi bi-arrow-left me-2"></i>
                        Back
                    </button>

                    <div className="row align-items-end" style={{ minHeight: '400px' }}>
                        <div className="col-md-3 mb-4 mb-md-0">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${drama.poster_path}`}
                                alt={drama.name}
                                className="img-fluid rounded shadow-lg w-100"
                                style={{ maxWidth: '300px' }}
                            />
                        </div>

                        <div className="col-md-9">
                            <h1 className="display-4 fw-bold mb-3">{drama.name}</h1>
                            
                            {drama.original_name && drama.original_name !== drama.name && (
                                <p className="fs-5 text-white-50 mb-3">{drama.original_name}</p>
                            )}


                            <div className="d-flex flex-wrap gap-3 mb-4">
                                {drama.first_air_date && (
                                    <span className="badge bg-danger px-3 py-2 fs-6">
                                        {drama.first_air_date.split('-')[0]}
                                    </span>
                                )}
                                {drama.vote_average > 0 && (
                                    <span className="badge bg-warning text-dark px-3 py-2 fs-6">
                                        <i className="bi bi-star-fill me-1"></i>
                                        {drama.vote_average.toFixed(1)}
                                    </span>
                                )}
                                {drama.number_of_seasons && (
                                    <span className="badge bg-light text-dark px-3 py-2 fs-6">
                                        {drama.number_of_seasons} {drama.number_of_seasons === 1 ? 'Season' : 'Seasons'}
                                    </span>
                                )}
                                {drama.number_of_episodes && (
                                    <span className="badge bg-light text-dark px-3 py-2 fs-6">
                                        {drama.number_of_episodes} Episodes
                                    </span>
                                )}
                            </div>

                            {drama.genres && drama.genres.length > 0 && (
                                <div className="mb-4">
                                    {drama.genres.map((genre) => (
                                        <span key={genre.id} className="badge bg-secondary me-2 px-3 py-2">
                                            {genre.name}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <div className="d-flex gap-3">
                                <button 
                                    className={`btn ${isFavorite ? 'btn-danger' : 'btn-outline-light'} btn-lg px-4`}
                                    onClick={handleFavoriteToggle}
                                >
                                    <i className={`bi bi-heart${isFavorite ? '-fill' : ''} me-2`}></i>
                                    {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container py-5">
                <div className="row">
                    <div className="col-lg-8">
                        {drama.overview && (
                            <section className="mb-5">
                                <h2 className="fw-bold mb-3">Overview</h2>
                                <p className="text-muted fs-5 lh-lg">{drama.overview}</p>
                            </section>
                        )}

                        {drama.seasons && drama.seasons.length > 0 && (
                            <section className="mb-5">
                                <h2 className="fw-bold mb-4">Seasons</h2>
                                <div className="row g-3">
                                    {drama.seasons.map((season) => (
                                        <div key={season.id} className="col-md-6">
                                            <div className="card border-0 shadow-sm">
                                                <div className="row g-0">
                                                    {season.poster_path && (
                                                        <div className="col-4">
                                                            <img
                                                                src={`https://image.tmdb.org/t/p/w200${season.poster_path}`}
                                                                alt={season.name}
                                                                className="img-fluid rounded-start h-100"
                                                                style={{ objectFit: 'cover' }}
                                                            />
                                                        </div>
                                                    )}
                                                    <div className={season.poster_path ? 'col-8' : 'col-12'}>
                                                        <div className="card-body">
                                                            <h5 className="card-title fw-bold">{season.name}</h5>
                                                            {season.air_date && (
                                                                <p className="text-muted small mb-2">
                                                                    <i className="bi bi-calendar me-2"></i>
                                                                    {new Date(season.air_date).getFullYear()}
                                                                </p>
                                                            )}
                                                            <p className="text-muted small mb-0">
                                                                {season.episode_count} {season.episode_count === 1 ? 'Episode' : 'Episodes'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    <div className="col-lg-4">
                        <div className="card border-0 shadow-sm sticky-top" style={{ top: '20px' }}>
                            <div className="card-body">
                                <h5 className="fw-bold mb-4">Details</h5>
                                
                                {drama.status && (
                                    <div className="mb-3">
                                        <small className="text-muted d-block mb-1">Status</small>
                                        <strong>{getStatus(drama.status)}</strong>
                                    </div>
                                )}

                                {drama.first_air_date && (
                                    <div className="mb-3">
                                        <small className="text-muted d-block mb-1">First Air Date</small>
                                        <strong>{new Date(drama.first_air_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong>
                                    </div>
                                )}

                                {drama.last_air_date && (
                                    <div className="mb-3">
                                        <small className="text-muted d-block mb-1">Last Air Date</small>
                                        <strong>{new Date(drama.last_air_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong>
                                    </div>
                                )}

                                {drama.networks && drama.networks.length > 0 && (
                                    <div className="mb-3">
                                        <small className="text-muted d-block mb-1">Network</small>
                                        <strong>{drama.networks.map(n => n.name).join(', ')}</strong>
                                    </div>
                                )}

                                {drama.origin_country && drama.origin_country.length > 0 && (
                                    <div className="mb-3">
                                        <small className="text-muted d-block mb-1">Country</small>
                                        <strong>{drama.origin_country.join(', ')}</strong>
                                    </div>
                                )}

                                {drama.original_language && (
                                    <div className="mb-3">
                                        <small className="text-muted d-block mb-1">Language</small>
                                        <strong>{drama.original_language.toUpperCase()}</strong>
                                    </div>
                                )}

                                {drama.homepage && (
                                    <a 
                                        href={drama.homepage} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="btn btn-outline-danger w-100 mt-3"
                                    >
                                        <i className="bi bi-box-arrow-up-right me-2"></i>
                                        Official Website
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DramaDetails;