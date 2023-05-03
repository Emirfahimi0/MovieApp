
declare interface IMovie {
    page?:number
    results: TMovieType[];
    total_pages:number;
    total_results:number;
   
}



declare type TMovieType = {
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

declare enum MediaType {
  Movie = "movie",
  tv="tv"
}

declare enum OriginalLanguage {
  En = "en",
  Es = "es",
  Ja = "ja",
  Ko = "ko",
}

declare interface IUserRating  {
  Movie: TMovieType| IMovieDetail;
  ratingVal: number;
  user: TUser;
}

declare type TUser = {
  id: string;
  password: string;
  username: string;
  responseToken?:string;
};

declare interface IDetailsMovie {
 detail:IMovieDetail ,
 review:IResultReview[]
}

