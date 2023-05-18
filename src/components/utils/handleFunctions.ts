import {   getGenreMovie, getMovieDetails, getMovieWatchlist, getReviewById } from "../../services/api-services";
import { Alert } from "react-native";


  export const fetchWatchlist = async () => {
    const data: TMovieType[] = await getMovieWatchlist();
    return data;
  };
  export const fetchGenreItem = async () => {
    const responseGenre: TGenre[] = await getGenreMovie();
    // set state for in context provider for Genre []
    return responseGenre;
  };
 
  export const handleShowDetailScreen = async (id: number | undefined ,navigation,setLoading:(loading:boolean)=>void,storeAllDetailsState:(detail:IMovieDetail,review:IResultReview[])=>void): Promise<void> => {
    const getDetailsFromApi = await handleMovieDetail(id);
    if (getDetailsFromApi !== undefined) {
      setLoading(false);
      storeAllDetailsState(getDetailsFromApi.detail, getDetailsFromApi.review);
      // navigate...
      navigation.navigate("DetailScreen", { item: getDetailsFromApi.detail, review: getDetailsFromApi.review });
    } else setLoading(true);
  };
  // Functions use in HomeScreen and WatchlistScreen
 export const  handleMovieDetail = async (id: number | undefined ):Promise<IDetailsMovie> => {
    const resDetail: IMovieDetail = await getMovieDetails(id);
    const resReview: IResultReview[] = await getReviewById(id);
    //const navigation:RootNavigationProp = useNavigation()
    let resAllDetails:IDetailsMovie ={
      detail:resDetail,
      review:resReview
    }

    if (resDetail !== undefined && resReview !== undefined) {
      resAllDetails = {...{detail:resDetail},...{review:resReview}}
      //From api service
     
    } else {
      // alert {you dont have data }
      Alert.alert("getDetails and getReview undefined. ");
     
    }
    return resAllDetails;
  };

