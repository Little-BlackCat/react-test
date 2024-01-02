import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type LoadingState = {
  loading: boolean
}

const initialValue: LoadingState = {
  loading: false
}

const loadingSlice = createSlice({
  name: "loading",
  initialState: initialValue,
  reducers: {
    loadingStatus: (state: LoadingState, action: PayloadAction<boolean>) => {
      state.loading = action.payload === false ? true : false
    }
  }
})

export const { loadingStatus } = loadingSlice.actions
export const loadingSelector = (store: RootState) => store.loadingReducer
export default loadingSlice.reducer