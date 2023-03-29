export interface IMovie {
    page?:number
    results: Iresult[];
    total_pages:number;
    total_results:number;
   
}

export interface Iresult {
    adult:             boolean;
    backdrop_path:     string;
    first_air_date ?:    string;
    genre_ids:         number[];
    id:                number;
    name ? :           string;
    origin_country ?:  string[];
    original_language: string;
    original_name ?:     string;
    original_title ?:    string;
    overview:          string;
    poster_path:       string;
    release_date:      string;
    title:             string;
    video:             boolean;
    vote_average:      number;
    vote_count:        number;
    popularity:        number;
}