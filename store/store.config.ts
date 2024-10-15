import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import movieReducer from './app.reducer';
import {watchFetchMovies, watchFetchMovieDetail} from './app.saga';
import {all} from 'redux-saga/effects';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    movies: movieReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

function* rootSaga() {
  yield all([watchFetchMovies(), watchFetchMovieDetail()]);
}

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
