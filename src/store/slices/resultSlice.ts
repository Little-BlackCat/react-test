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
  dataSource: DataType[],
  selectedRowKeys: React.Key[],
  hasSelected: boolean,
  loading: boolean,
}

const initialValue: ResultState = {
  dataSource: [ 
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
    setDefualtData: (state: ResultState, action: PayloadAction<DataType[]>) => {
      state.dataSource = action.payload
    },
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
    setDefultSelected: (state: ResultState) => {
      state.selectedRowKeys = []
      state.hasSelected = false
    }
    
  }
})

export const { setDefualtData, onSelectChange, handleSelectAll, loadingProcess, setDefultSelected } = resultSlice.actions
export const resultSelector = (store: RootState) => store.resultReducer
export default resultSlice.reducer