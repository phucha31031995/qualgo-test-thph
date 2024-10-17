import {
  FETCH_MOVIES,
  SET_MOVIES,
  FETCH_MOVIE_DETAIL,
  SET_SELECTED_MOVIE,
  FETCH_MOVIES_FAIL,
  FETCH_MOVIE_DETAIL_FAILED,
} from './actionTypes';

export const fetchMovies = (query?: string) => ({
  type: FETCH_MOVIES,
  payload: query,
});

export const setMovies = movies => ({
  type: SET_MOVIES,
  payload: movies,
});

export const fetchMoviesFailed = (query?: string) => ({
  type: FETCH_MOVIES_FAIL,
  payload: query,
});

export const fetchMoviesDetail = (id?: string) => ({
  type: FETCH_MOVIE_DETAIL,
  payload: id,
});

export const setSelectedMovie = movie  => ({
  type: SET_SELECTED_MOVIE,
  payload: movie,
});

export const fetchMoviesDetaiFailed = (id?: string) => ({
  type: FETCH_MOVIE_DETAIL_FAILED,
  payload: id,
});