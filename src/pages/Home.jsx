import DramaCard from "../components/DramaCard";
import { useState, useEffect} from "react";
import { searchDrama } from "../services/api";
import { getPopularDrama } from "../services/api";

function Home(){

    const [searchQuery, setSearchQuery] = useState("");
    const [activeSearch, setActiveSearch] = useState("");
    const [dramas, setDrama] = useState([]);
    const [error, setError] = useState([null]);
    const [loading, setLoading] = useState([true]);

    useEffect(() => {   
        const loadPopularDrama = async () => {
            try {
                const popularDrama = await getPopularDrama()
                setDrama(popularDrama)
            } catch (err) {
                console.log(err);
                setError("Failed to load dramas...")
            }
            finally {
                setLoading(false)
            }
        }

        loadPopularDrama()
    }, [])

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!searchQuery.trim()) {
            setLoading(true);
            setActiveSearch("");
            try {
                const popularDrama = await getPopularDrama();
                setDrama(popularDrama);
                setError(null);
            } catch (err) {
                console.log(err);
                setError("Failed to load dramas...");
            } finally {
                setLoading(false);
            }
            return;
        }

        if (loading) return

        setLoading(true)

        try {
            const searchResults = await searchDrama(searchQuery)
            setDrama(searchResults)
            setError(null)
            setActiveSearch(searchQuery)
            setSearchQuery("")
        } catch (err) {
            console.log(err);
            setError("Failed to search drama...")
        }
        finally {
            setLoading(false)
        }
        

    };
    
    return (
        <div className="home py-2">
            
            <div className="container text-center mb-5">
                <div>
                    <div className="mb-4">
                        <h1 className="display-3 fw-bold text-dark mb-2">
                            <i className="bi bi-heart-fill text-danger me-2"></i>
                            K<span className="text-danger">Drama Hub</span>
                        </h1>
                        <p className="text-muted fs-5">Discover your next favorite Korean drama</p>
                    </div>

                    <form onSubmit={handleSearch} className="mx-auto" style={{ maxWidth: '600px' }}>
                        <div className="input-group input-group-lg shadow-sm">
                            <span className="input-group-text bg-white border-end-0 ps-4">
                                <i className="bi bi-search text-muted fs-5"></i>
                            </span>
                            
                            <input
                                type="text"
                                className="form-control border-start-0 border-end-0 shadow-none"
                                placeholder="Search for dramas..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{ 
                                    fontSize: '1rem',
                                    padding: '0.75rem 1rem'
                                }}
                            />
                            
                            <button 
                                className="btn btn-danger px-5 fw-semibold" 
                                type="submit"
                                style={{
                                    borderTopLeftRadius: 0,
                                    borderBottomLeftRadius: 0
                                }}
                            >
                                <i className="bi bi-search me-2"></i>
                                Search
                            </button>
                        </div>
                    </form>

                    <div className="mt-4">
                        <small className="text-muted me-2">Popular:</small>
                        <span className="badge bg-light text-dark border me-2 px-3 py-2">Squid Game</span>
                        <span className="badge bg-light text-dark border me-2 px-3 py-2">Running Man</span>
                        <span className="badge bg-light text-dark border me-2 px-3 py-2">Idol I</span>
                        <span className="badge bg-light text-dark border px-3 py-2">Weak Hero</span>
                    </div>
                </div>
            </div>

            {error && <div>{error}</div>}

            {loading ? (
                <div className="container text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="container pb-5">
                    <h3 className="fw-bold mb-4 text-dark">
                        {/* TO DO: Recent Updates */}
                        {activeSearch ? "Results for " + activeSearch : "Popular Drama"}
                    </h3>
                    <div className="row g-4">
                    {dramas.map((drama) => (
                        <div key={drama.id} className="col-6 col-md-4 col-lg-3">
                        <DramaCard drama={drama} />
                        </div>
                    ))}
                    </div>
                </div>
            )}
        </div>
    );

}

export default Home;