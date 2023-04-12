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
export interface ICreateSession {
    new_session: Session
}

export type Session = {
    session_id:string
    success:boolean,
}
export interface IListGenres {
    genres: Genre[];
  }
  
  export type Genre = {
    id: number;
    name: string;
  }

 export interface IWatchListResponse  { 
status_code: number,
status_message: string,
success: boolean
 }

  export interface IMovieDetail {
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
    production_companies:  IProductionCompany[];
    production_countries:  IProductionCountry[];
    release_date:          Date;
    revenue:               number;
    runtime:               number;
    spoken_languages:      ISpokenLanguage[];
    status:                string;
    tagline:               string;
    title:                 string;
    video:                 boolean;
    vote_average:          number;
    vote_count:            number;
}

  export interface IProductionCompany {
    id:             number;
    logo_path:      null | string;
    name:           string;
    origin_country: string;
}

export interface IProductionCountry {
    iso_3166_1: string;
    name:       string;
}

export interface ISpokenLanguage {
    iso_639_1: string;
    name:      string;
}

export interface IReview {
    id:            number;
    page:          number;
    results:       IResult[];
    total_pages:   number;
    total_results: number;
}

export interface IResult {
    author_details: IAuthorDetails;
    author:         string;
    content:        string;
    created_at:     Date;
    id:             string;
    isShown:        boolean;
    updated_at:     Date;
    url:            string;
}

export interface IAuthorDetails {
    avatar_path: null | string;
    name:        string;
    rating:      number | null;
    username:    string;
}

export interface IAccountState {
    favourite:boolean
    id:number;
    rated: RatedValue | boolean;
    watchlist:boolean;
}
export type RatedValue = {
    value:number | undefined
}

export interface IRating {
    status_code: number;
    status_message: string;
    success:boolean;
  }