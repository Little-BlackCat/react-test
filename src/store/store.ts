import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import moveReducer from "./slices/moveSlice"

const reducer = {
  moveReducer
}

export const store = configureStore({
  reducer,
  devTools: import.meta.env.VITE_NODE_ENV === "development",
})

// export type of root state from reducers
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
