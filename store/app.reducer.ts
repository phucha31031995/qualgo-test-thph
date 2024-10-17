// store/app.reducer.ts
import {
  SET_MOVIES,
  SET_SELECTED_MOVIE,
  FETCH_MOVIES,
  FETCH_MOVIE_DETAIL,
  FETCH_MOVIES_FAIL,
  FETCH_MOVIE_DETAIL_FAILED,
} from './actionTypes';

export interface Movie {
  '#ACTORS': string;
  '#AKA': string;
  '#IMDB_ID': string;
  '#IMDB_IV': string;
  '#IMDB_URL': string;
  '#IMG_POSTER': string;
  '#RANK': number;
  '#TITLE': string;
  '#YEAR': number;
  photo_height: number;
  photo_width: number;
}

interface MovieState {
  movies: Movie[];
  selectedMovie: Movie | undefined;
  loadingList: boolean;
  loadingDetail: boolean;
  errorList?: string;
  errorDetail?: string;
}

const initialState: MovieState = {
  movies: [],
  selectedMovie: undefined,
  loadingList: true,
  loadingDetail: true,
  errorList: undefined,
  errorDetail: undefined,
};

const movieReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_MOVIES:
      return {...state, loadingList: true};
    case FETCH_MOVIES_FAIL:
      return {...state, loadingList: false, errorList: action.payload};
    case FETCH_MOVIE_DETAIL:
      return {...state, loadingDetail: true};
    case FETCH_MOVIE_DETAIL_FAILED:
      return {...state, loadingList: false, errorDetail: action.payload};
    case SET_MOVIES:
      return {...state, movies: action.payload, loadingList: false};
    case SET_SELECTED_MOVIE:
      return {...state, selectedMovie: action.payload, loadingDetail: false};
    default:
      return state;
  }
};

export default movieReducer;
