import {call, put, takeLatest} from 'redux-saga/effects';
import {
  setMovies,
  setSelectedMovie,
  fetchMoviesDetaiFailed,
  fetchMoviesFailed,
} from './actions'; // Import action creator
import {FETCH_MOVIES, FETCH_MOVIE_DETAIL} from './actionTypes';
import axios from 'axios';
import {fetchRandomMovies, fetchMovieDetails, searchMovies} from '../api/movie';

function* fetchMovies(action) {
  try {
    let response;
    if (action.payload) {
      response = yield call(searchMovies, action.payload);
    } else {
      response = yield call(fetchRandomMovies);
    }
    let movies = response.description;
    if (movies.length > 10 && !action.payload) {
      movies = movies.splice(0, 10);
    }
    yield put(setMovies(movies));
  } catch (error) {
    console.error('Error fetching movies:', error);
    yield put(fetchMoviesFailed(error.message));
  }
}

export function* watchFetchMovies() {
  yield takeLatest(FETCH_MOVIES, fetchMovies);
}

function* fetchMovieDetail(action) {
  try {
    console.log(action);
    const response = yield call(fetchMovieDetails, action.payload);
    const movies = response.data;
    yield put(setSelectedMovie(movies));
  } catch (error) {
    console.error('Error fetching movies:', error);
    yield put(fetchMoviesDetaiFailed(error.message));
  }
}

export function* watchFetchMovieDetail() {
  yield takeLatest(FETCH_MOVIE_DETAIL, fetchMovieDetail);
}
