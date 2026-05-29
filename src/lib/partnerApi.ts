const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export type MovieSummary = {
    id: number;
    title: string;
    synopsis: string;
    releaseDate: string;
    posterUrl: string;
};

export type ShowSummary = {
    id: number;
    title: string;
    synopsis: string;
    airDate: string;
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

export type ShowPage = {
    results: ShowSummary[];
    pagination: Pagination;
};

export type Author = {
    id: number;
    subjectId: string;
    displayName: string;
};

export type Review = {
    id: number;
    mediaId: number;
    mediaType: 'movie' | 'tv';
    title: string | null;
    body: string;
    createdAt: string;
    updatedAt: string;
    author: Author;
};

export type Rating = {
    id: number;
    mediaId: number;
    mediaType: 'movie' | 'tv';
    score: number;
    createdAt: string;
    updatedAt: string;
    author: Author;
};

export type MediaType = 'movie' | 'tv';

export const partnerUrls = {
    searchMovies: (title: string, page = 1) =>
        `${BASE_URL}/v1/movie/search?title=${encodeURIComponent(title)}&page=${page}`,
    popularMovies: (page = 1) =>
        `${BASE_URL}/v1/movie/popular?page=${page}`,
    movieDetails: (id: string) =>
        `${BASE_URL}/v1/movie/details/${id}`,
    searchShows: (title: string, page = 1) =>
        `${BASE_URL}/v1/tv/search?title=${encodeURIComponent(title)}&page=${page}`,
    popularShows: (page = 1) =>
        `${BASE_URL}/v1/tv/popular?page=${page}`,
    showDetails: (id: string) =>
        `${BASE_URL}/v1/tv/details/${id}`,
    ratingsMe: () => `${BASE_URL}/v1/ratings/me?limit=100`,
    reviewsMe: () => `${BASE_URL}/v1/reviews/me?limit=100`,
};
