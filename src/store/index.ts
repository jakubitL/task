import { v4 as uuid } from 'uuid';
import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialReviewsState = [
  {
    id: uuid(),
    title: 'Lorem ipsum',
    content: 'Lorem ipsum dolor sit amet',
  },
];

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

export const { addReview } = reviewsSlice.actions;

export const store = configureStore({
  reducer: {
    reviews: reviewsSlice.reducer,
  },
});