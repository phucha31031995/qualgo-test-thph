// store/app.reducer.ts
import {SET_MOVIES, SET_SELECTED_MOVIE} from './actionTypes';

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
}

const initialState: MovieState = {
  movies: [],
  selectedMovie: undefined,
};

const movieReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_MOVIES:
      console.log('setting movies', action.payload);
      return {...state, movies: action.payload};
    case SET_SELECTED_MOVIE:
      console.log('setting selected movie', action.payload);
      return {...state, selectedMovie: action.payload};
    default:
      return state;
  }
};

export default movieReducer;
