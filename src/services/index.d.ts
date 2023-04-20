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
    new_session: TSession
}

export interface IResponseTokenMerge {
    success: boolean
    expires_at: string
    session_id: string
    request_token: string
  }
  export interface IRequestBody {
    username:string,
    password:string,
    request_token:string 
  }
export interface IResponseAccount{
    avatar: Avatar
    id: number,
    iso_639_1: string,
    iso_3166_1: string,
    name: string,
    include_adult: boolean,
    username: string
  }
  export interface Avatar {
    gravatar: Gravatar;
}

export interface Gravatar {
    hash: string;
}

export type TSession = {
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
    reviews:                IReview;
    runtime:               number;
    spoken_languages:      ISpokenLanguage[];
    status:                string;
    tagline:               string;
    title:                 string;
    video:                 boolean;
    vote_average:          number;
    vote_count:            number;
    videos:                Videos;
    "watch/providers": WatchProviders;

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


export interface Videos {
  results: Result[]
}

export interface Result {
  iso_639_1: string
  iso_3166_1: string
  name: string
  key: string
  site: string
  size: number
  type: string
  official: boolean
  published_at: string
  id: string
}

export interface WatchProviders {
  results: Results
}

export interface Results {
  AT: At
  AU: Au
  BE: Be
  CA: Ca
  CH: Ch
  DE: De
  DK: Dk
  ES: Es
  FI: Fi
  GB: Gb
  HK: Hk
  IE: Ie
  IN: In
  IS: Is
  IT: It
  JP: Jp
  KR: Kr
  NL: Nl
  NO: No
  NZ: Nz
  PT: Pt
  SE: Se
  TW: Tw
  US: Us
}

export interface At {
  link: string
  buy: Buy[]
}

export interface Buy {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Au {
  link: string
  buy: Buy2[]
}

export interface Buy2 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Be {
  link: string
  buy: Buy3[]
}

export interface Buy3 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Ca {
  link: string
  buy: Buy4[]
}

export interface Buy4 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Ch {
  link: string
  buy: Buy5[]
}

export interface Buy5 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface De {
  link: string
  buy: Buy6[]
}

export interface Buy6 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Dk {
  link: string
  buy: Buy7[]
}

export interface Buy7 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Es {
  link: string
  buy: Buy8[]
}

export interface Buy8 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Fi {
  link: string
  buy: Buy9[]
}

export interface Buy9 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Gb {
  link: string
  buy: Buy10[]
}

export interface Buy10 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Hk {
  link: string
  buy: Buy11[]
}

export interface Buy11 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Ie {
  link: string
  buy: Buy12[]
}

export interface Buy12 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface In {
  link: string
  buy: Buy13[]
}

export interface Buy13 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Is {
  link: string
  buy: Buy14[]
}

export interface Buy14 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface It {
  link: string
  buy: Buy15[]
}

export interface Buy15 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Jp {
  link: string
  buy: Buy16[]
}

export interface Buy16 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Kr {
  link: string
  buy: Buy17[]
}

export interface Buy17 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Nl {
  link: string
  buy: Buy18[]
}

export interface Buy18 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface No {
  link: string
  buy: Buy19[]
}

export interface Buy19 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Nz {
  link: string
  buy: Buy20[]
}

export interface Buy20 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Pt {
  link: string
  buy: Buy21[]
}

export interface Buy21 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Se {
  link: string
  buy: Buy22[]
}

export interface Buy22 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Tw {
  link: string
  buy: Buy23[]
}

export interface Buy23 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

export interface Us {
  link: string
  buy: Buy24[]
}

export interface Buy24 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
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
    rated: boolean | { value: RatedValue };
    watchlist:boolean;
}

declare enum RatedValue {
    ONE_STAR = 1,
    TWO_STARS = 2,
    THREE_STARS = 3,
    FOUR_STARS = 4,
    FIVE_STARS = 5,
  }

export interface IRating {
    status_code: number;
    status_message: string;
    success:boolean;
  }