import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type MoveState = {
  shapeList: string[],
  position: string
}

const initialValue: MoveState = {
  shapeList: ["circle", "oval", "rectangle", "square", "parallelogram", "trapeziod"],
  position: "result-default"
}

const moveSlice = createSlice({
  name: "move",
  initialState: initialValue,
  reducers: {
    random: (state: MoveState) => {
      // Function to shuffle the array
      const newArray = [...state.shapeList]
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); 
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // Destructuring assignment
      }
      state.shapeList = newArray
    },
    moveLeft: (state: MoveState, action: PayloadAction<string[]>) => {
      const newArray: string[] = [...action.payload];
      const firstItem: string = newArray.filter(item => item !== undefined)[0]; // select first item
      newArray.shift(); // remove first item
      newArray.push(firstItem); // push first item to the end
      state.shapeList = newArray // set new state
    },
    moveRight: (state: MoveState, action: PayloadAction<string[]>) => {
      const newArray: string[] = [...action.payload];
      const lastItem: string = newArray.filter(item => item !== undefined)[newArray.length - 1]; // select first item
      newArray.pop(); // remove first item 
      newArray.unshift(lastItem); // push first item
      state.shapeList = newArray // set new state
    },
    movePosition: (state: MoveState) => {
      state.position = state.position === "result-default" ? "result-reverse" : "result-default"
    }
  },
  // extraReducers: (builder) => {}
})

export const { random, moveLeft, moveRight, movePosition } = moveSlice.actions
export const moveSelector = (store: RootState) => store.moveReducer
export default moveSlice.reducer