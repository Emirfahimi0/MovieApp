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
    belongs_to_collection: string |null;
    budget:                number;
    genres:                TGenre[];
    homepage:              string;
    id:                    number;
    imdb_id:               string;
    original_language:     string;
    original_title:        string;
    overview:              string;
    popularity:            number;
    poster_path:           string |null;
    production_companies:  IProductionCompany[];
    production_countries:  IProductionCountry[];
    recommendations :      IMovie;
    release_date:          Date;
    revenue:               number;
    reviews:               IReview;
    runtime:               number;
    spoken_languages:      ISpokenLanguage[];
    status:                string;
    tagline:               string;
    title:                 string;
    video:                 boolean;
    videos:                IVideos;
    vote_average:          number;
    vote_count:            number;

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

  declare type FastImageFlex = import("react-native").FlexStyle
  declare type FastImageShadow = import("react-native").ShadowStyleIOS
  declare type FastImageTransform = import("react-native").TransformsStyle

  declare interface FastImageStyle extends FastImageFlex, FastImageShadow, FastImageTransform {
    backfaceVisibility?: "visible" | "hidden";
    backgroundColor?: string;
    borderBottomLeftRadius?: number;
    borderBottomRightRadius?: number;
    borderColor?: string;
    borderRadius?: number;
    borderTopLeftRadius?: number;
    borderTopRightRadius?: number;
    borderWidth?: number;
    opacity?: number;
    overlayColor?: string;
  }