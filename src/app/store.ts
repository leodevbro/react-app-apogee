import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { counterReducer } from "./redux-slices/counterSlice";
import { sweetReducer } from "./redux-slices/sweetSlice";

export const store = configureStore({
  reducer: {
    sweet: sweetReducer,
    counter: counterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;