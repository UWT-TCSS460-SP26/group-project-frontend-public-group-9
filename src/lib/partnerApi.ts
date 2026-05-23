const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export type MovieSummary = {
    id: number;
    title: string;
    synopsis: string;
    releaseDate: string;
    posterUrl: string;
};

export type Pagination = {
    page: number;
    totalResults: number;
    totalPages: number;
};

export type MoviePage = {
    results: MovieSummary[];
    pagination: Pagination;
};

export const partnerUrls = {
    searchMovies: (title: string, page = 1) =>
        `${BASE_URL}/v1/movie/search?title=${encodeURIComponent(title)}&page=${page}`,
    popularMovies: (page = 1) =>
        `${BASE_URL}/v1/movie/popular?page=${page}`,
    movieDetails: (id: string) =>
        `${BASE_URL}/v1/movie/details/${id}`,
};
