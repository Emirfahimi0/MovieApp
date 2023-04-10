export type Ttoken = {
    password:string,
    request_token:string
    username:string,
}
export type TResponseToken = {
    expires_at:string,
    request_token:string
    status_code:number,
    success:boolean,
}
export interface createSession {
    new_session: session
}

export type session = {
    session_id:string
    success:boolean,
}
export interface listGenres {
    genres: Genre[];
  }
  
  export type Genre = {
    id: number;
    name: string;
  }

 export interface watchListResponse  { 
status_code: number,
status_message: string,
success: boolean
 }

  export interface MovieDetail {
    adult:                 boolean;
    backdrop_path:         string;
    belongs_to_collection: null;
    budget:                number;
    genres:                Genre[];
    homepage:              string;
    id:                    number;
    imdb_id:               string;
    original_language:     string;
    original_title:        string;
    overview:              string;
    popularity:            number;
    poster_path:           null;
    production_companies:  ProductionCompany[];
    production_countries:  ProductionCountry[];
    release_date:          Date;
    revenue:               number;
    runtime:               number;
    spoken_languages:      SpokenLanguage[];
    status:                string;
    tagline:               string;
    title:                 string;
    video:                 boolean;
    vote_average:          number;
    vote_count:            number;
}

  export interface ProductionCompany {
    id:             number;
    logo_path:      null | string;
    name:           string;
    origin_country: string;
}

export interface ProductionCountry {
    iso_3166_1: string;
    name:       string;
}

export interface SpokenLanguage {
    iso_639_1: string;
    name:      string;
}

export interface Review {
    id:            number;
    page:          number;
    results:       Result[];
    total_pages:   number;
    total_results: number;
}

export interface Result {
    author:         string;
    author_details: AuthorDetails;
    content:        string;
    created_at:     Date;
    id:             string;
    updated_at:     Date;
    url:            string;
    isShown:        boolean;
}

export interface AuthorDetails {
    avatar_path: null | string;
    name:        string;
    rating:      number | null;
    username:    string;
}

export interface accountState {
    favourite:boolean,
    id:number,
    rated: ratedValue | boolean,
    watchlist:boolean
}
export type ratedValue = {
    value:number
}

export interface InterfaceRating {
    status_code: number;
    status_message: string;
    success:boolean;
  }