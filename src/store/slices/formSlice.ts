import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface PersonalData {
  birthday: string
  expectedSalary: string
  firstName: string
  gender: string
  id0: string 
  id1: string 
  id2: string 
  id3: string 
  id4: string 
  id5: string 
  idNumber?: string
  lastName: string
  nameTitle: string
  nationality: string
  passport?: string
  prefixTelephone: string
  suffixTelephone: string
  telephoneNumber: string
}

type FormState = {
  formData: PersonalData,
  option: string[],
  selectOption: string,
  errorIdNumber: boolean
}

const initialValue: FormState = {
  formData: {
    birthday: "",
    expectedSalary: "",
    firstName: "",
    gender: "",
    id0: "", 
    id1: "", 
    id2: "", 
    id3: "", 
    id4: "", 
    id5: "", 
    idNumber: "",
    lastName: "",
    nameTitle: "",
    nationality: "",
    passport: "",
    prefixTelephone: "",
    suffixTelephone: "",
    telephoneNumber: ""
  },
  option: Array.from({ length: 100 }, (_, i) => `+${String(i).padStart(2, "0")}`),
  selectOption: "",
  errorIdNumber: false,
}

const formSlice = createSlice({
  name: "form",
  initialState: initialValue,
  reducers: {
    errorIdNumberState: (state: FormState, action: PayloadAction<boolean>) => {
      state.errorIdNumber = action.payload
    }
  }
})


export const { errorIdNumberState } = formSlice.actions
export const formSelector = (store: RootState) => store.formReducer
export default formSlice.reducer