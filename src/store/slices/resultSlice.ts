import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import React from "react";

export interface DataType {
  key: React.Key;
  fullName: string;
  gender: string;
  telephoneNumber: string;
  nationality: string
}

type ResultState = {
  data: DataType[],
  selectedRowKeys: React.Key[],
  hasSelected: boolean,
  loading: boolean,
}

const initialValue: ResultState = {
  data: [ 
    {
      key: "initialRow", 
      fullName: "",
      gender: "",
      telephoneNumber: "",
      nationality: "",
    }
  ],
  selectedRowKeys: [],
  hasSelected: false,
  loading: false
}

const resultSlice = createSlice({
  name: "result",
  initialState: initialValue,
  reducers: {
    onSelectChange: (state: ResultState, action: PayloadAction<any>) => {
      state.selectedRowKeys = action.payload
      state.hasSelected = action.payload.length > 0
    },
    handleSelectAll: (state: ResultState, action: PayloadAction<DataType[]>) => {
      const newSelectedRowKeys =
        state.selectedRowKeys.length === action.payload.length
          ? []
          : action.payload.map((item) => item.key);
      
      state.selectedRowKeys = newSelectedRowKeys
      state.hasSelected = action.payload.length > 0
    },
    loadingProcess: (state: ResultState, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    deleteSelectData: (state: ResultState, action: PayloadAction<React.Key[]>) => {
      
    }
  }
})

export const { onSelectChange, handleSelectAll, loadingProcess } = resultSlice.actions
export const resultSelector = (store: RootState) => store.resultReducer
export default resultSlice.reducer