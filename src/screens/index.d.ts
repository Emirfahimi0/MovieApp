import { MovieDetail } from "src/services";

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




export type MovieType = {
    adult?:             boolean;
    backdrop_path:      string;
    first_air_date ?:   string;
    genre_ids:          number[];
    id:                 number;
    media_type:         MediaType;
    name?:              string;
    origin_country?:    string[];
    original_language:  OriginalLanguage;
    original_name ?:    string;
    overview:           string;
    popularity:         number;
    poster_path:        string;
    release_date?:      string;
    title?:             string;
    video?:             boolean;
    vote_average:       number;
    vote_count:         number;
  original_title ?:     string;
}

export enum MediaType {
  Movie = "movie",
  tv="tv"
}

export enum OriginalLanguage {
  En = "en",
  Es = "es",
  Ja = "ja",
  Ko = "ko",
}

export interface userRating  {
  Movie: MovieType|MovieDetail;
  ratingVal: number;
  user: user;
}

export type user = {
  id: string;
  password: string;
  username: string;
};

