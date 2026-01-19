const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL


export const getPopularDrama = async () => {
    const response = await fetch(`${BASE_URL}?api_key=${API_KEY}&with_origin_country=KR&with_original_language=ko&sort_by=popularity.desc&vote_count.gte=50`);
    const data = await response.json()
    return data.results.slice(0, 15);
}

// TO DO
export const getRecentUpdateDrama = async () => {

    const today = new Date().toISOString().split("T")[0];
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    const lastMonthStr = lastMonth.toISOString().split("T")[0];

    const response = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_origin_country=KR&with_original_language=ko&sort_by=first_air_date.desc&first_air_date.gte=${lastMonthStr}&first_air_date.lte=${today}`)
    const data = await response.json()
    return data.results.slice(0, 10);

}

//

export const searchDrama = async (query) => {
    const response = await fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );

    const data = await response.json();

    const koreanDramas = data.results.filter(
        show =>
        show.origin_country?.includes("KR") &&
        show.original_language === "ko"
    );

    return koreanDramas;
};

export const getDramaDetails = async (id) => {
    const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();
    return data;
};
