import { v4 as uuid } from 'uuid';
import { createSlice, configureStore } from '@reduxjs/toolkit';
import type { Breadcrumb } from "../types";

export const breadcrumbsNames: Breadcrumb[] = [
  {
    route: '/',
    href: '',
    title: 'Strona główna'
  },
  {
    route: '/movies',
    href: '',
    title: 'Filmy'
  },
  {
    route: '/characters',
    href: '',
    title: 'Postacie'
  },
  {
    route: '/characters/[id]',
    href: '',
    title: 'Szczegóły postaci'
  },
  {
    route: '/movies/[id]',
    href: '',
    title: 'Szczegóły filmu'
  }
]
const initialReviewsState = [
  {
    id: uuid(),
    author_name: 'Jakub',
    content: 'Film prawie tak dobry jak ta aplikacja',
    film_id: 1
  },
  {
    id: uuid(),
    author_name: 'Jakub',
    content: 'Lucky Luke lepszy',
    character_id: 1
  },
];

const moviesSlice = createSlice({
  name: 'movies',
  initialState: [],
  reducers: {
    addMovies(state, action)  {
      return action.payload;
    },
  },
});


const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: initialReviewsState,
  reducers: {
    addReview(state, action) {
      state.push({
        id: uuid(),
        ...action.payload,
      });
    },
  },
});

const charactersSlice = createSlice({
    name: 'characters',
    initialState: [],
    reducers: {
      addCharacters(state, action) {
        return action.payload;
      },
    },
  });
export const { addReview } = reviewsSlice.actions;
export const { addCharacters } = charactersSlice.actions;
export const { addMovies } = moviesSlice.actions;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const store = configureStore({
  reducer: {
    reviews: reviewsSlice.reducer,
    characters: charactersSlice.reducer,
    movies: moviesSlice.reducer,
  },
});