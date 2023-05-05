declare type Ttoken = {
    password:string,
    request_token:string
    username:string,
}
declare type TResponseToken = {
    expires_at:string,
    request_token:string
    status_code:number,
    success:boolean,
}
declare interface ICreateSession {
    new_session: TSession
}

declare interface IResponseTokenMerge {
    success: boolean
    expires_at: string
    session_id: string
    request_token: string
  }
  declare interface IRequestBody {
    username:string,
    password:string,
    request_token:string 
  }
declare interface IResponseAccount{
    avatar: Avatar
    id: number,
    iso_639_1: string,
    iso_3166_1: string,
    name: string,
    include_adult: boolean,
    username: string
  }
  declare interface Avatar {
    gravatar: Gravatar;
}

declare interface Gravatar {
    hash: string;
}

declare type TSession = {
    session_id:string
    success:boolean,
}
declare interface IListGenres {
    genres: TGenre[];
  }
  
  declare type TGenre = {
    id: number;
    name: string;
  }

 declare interface IWatchListResponse  { 
status_code: number,
status_message: string,
success: boolean
 }

  declare interface IMovieDetail {
    adult:                 boolean;
    backdrop_path:         string;
    belongs_to_collection: null;
    budget:                number;
    genres:                TGenre[];
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
    videos:                IVideos;
    "watch/providers": IWatchProviders;

}

  declare interface IProductionCompany {
    id:             number;
    logo_path:      null | string;
    name:           string;
    origin_country: string;
}

declare interface IProductionCountry {
    iso_3166_1: string;
    name:       string;
}

declare interface ISpokenLanguage {
    iso_639_1: string;
    name:      string;
}


declare interface IVideos {
  results: IVideoResults[]
}

declare interface IVideoResults {
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

declare interface IWatchProviders {
  results: IWatchProviderResults
}

declare interface IWatchProviderResults {
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

declare interface At {
  link: string
  buy: Buy[]
}

declare interface Buy {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

declare interface Au {
  link: string
  buy: Buy2[]
}

declare interface Buy2 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

declare interface Be {
  link: string
  buy: Buy3[]
}

declare interface Buy3 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

declare interface Ca {
  link: string
  buy: Buy4[]
}

declare interface Buy4 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

declare interface Ch {
  link: string
  buy: Buy5[]
}

declare interface Buy5 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

declare interface De {
  link: string
  buy: Buy6[]
}

declare interface Buy6 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

declare interface Dk {
  link: string
  buy: Buy7[]
}

declare interface Buy7 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

declare interface Es {
  link: string
  buy: Buy8[]
}

declare interface Buy8 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

declare interface Fi {
  link: string
  buy: Buy9[]
}

declare interface Buy9 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

declare interface Gb {
  link: string
  buy: Buy10[]
}

declare interface Buy10 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

declare interface Hk {
  link: string
  buy: Buy11[]
}

declare interface Buy11 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

declare interface Ie {
  link: string
  buy: Buy12[]
}

declare interface Buy12 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

declare interface In {
  link: string
  buy: Buy13[]
}

declare interface Buy13 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

declare interface Is {
  link: string
  buy: Buy14[]
}

declare interface Buy14 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

declare interface It {
  link: string
  buy: Buy15[]
}

declare interface Buy15 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

declare interface Jp {
  link: string
  buy: Buy16[]
}

declare interface Buy16 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

declare interface Kr {
  link: string
  buy: Buy17[]
}

declare interface Buy17 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

declare interface Nl {
  link: string
  buy: Buy18[]
}

declare interface Buy18 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

declare interface No {
  link: string
  buy: Buy19[]
}

declare interface Buy19 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

declare interface Nz {
  link: string
  buy: Buy20[]
}

declare interface Buy20 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

declare interface Pt {
  link: string
  buy: Buy21[]
}

declare interface Buy21 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

declare interface Se {
  link: string
  buy: Buy22[]
}

declare interface Buy22 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

declare interface Tw {
  link: string
  buy: Buy23[]
}

declare interface Buy23 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

declare interface Us {
  link: string
  buy: Buy24[]
}

declare interface Buy24 {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}
declare interface IReview {
  id:            number;
  page:          number;
  results:       IResultReview[];
  total_pages:   number;
  total_results: number;
}

declare interface IResultReview {
  author_details: IAuthorDetails;
  author:         string;
  content:        string;
  created_at:     string;
  id:             string;
  isShown:        boolean;
  updated_at:     Date;
  url:            string;
}

declare interface IAuthorDetails {
  avatar_path: null | string;
  name:        string;
  rating:      number | null;
  username:    string;
}
declare interface IAccountState {
    favourite:boolean
    id:number;
    rated: boolean | { value: number };
    watchlist:boolean;
}



declare interface IRating {
    status_code: number;
    status_message: string;
    success:boolean;
  }