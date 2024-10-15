import {call, put, takeLatest} from 'redux-saga/effects';
import {setMovies, setSelectedMovie} from './actions'; // Import action creator
import {FETCH_MOVIES, FETCH_MOVIE_DETAIL} from './actionTypes';
import axios from 'axios';
import {fetchRandomMovies, fetchMovieDetails, searchMovies} from '../api/movie';

function* fetchMovies(action) {
  try {
    let response;
    console.log('Fetching movies', action);
    if (action.payload) {
    console.log('Fetching movies111', action);
        response = yield call(searchMovies, action.payload);
    } else {
        response = yield call(fetchRandomMovies);
    }
    console.log('hihihi', response)
    let movies = response.description;
    if (movies.length > 10) {
      movies = movies.splice(0, 10);
    }
    yield put(setMovies(movies));
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
}

export function* watchFetchMovies() {
  yield takeLatest(FETCH_MOVIES, fetchMovies);
}

function* fetchMovieDetail(action) {
  try {
    console.log(action)
    const response = yield call(fetchMovieDetails, action.payload);
    const movies = response.data;
    yield put(setSelectedMovie(movies));
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
}

export function* watchFetchMovieDetail() {
  yield takeLatest(FETCH_MOVIE_DETAIL, fetchMovieDetail);
}
