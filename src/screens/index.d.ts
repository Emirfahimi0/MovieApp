export interface IMovie {
    page?:number
    results: MovieType[];
    total_pages:number;
    total_results:number;
   
}

export interface listGenres {
    genres: Genre[];
  }
  
  export type Genre = {
    id: number;
    name: string;
  }


export interface ITempMovie  {
    id:number;
    original_language:string,
    original_title:string,
    overview:string,
    poster_path :string;
    rating:number;
    release_date:string;
    title:string;
}

export type MovieType = {
    adult?:             boolean;
    backdrop_path:     string;
    first_air_date ?:    string;
    genre_ids:         number[];
    id:                number;
    name?:           string;
    origin_country?:  string[];
    original_language: string;
    original_name ?:     string;
    original_title ?:    string;
    overview:          string;
    popularity:        number;
    poster_path:       string;
    release_date?:      string;
    title?:             string;
    video?:             boolean;
    vote_average:      number;
    vote_count:        number;
}