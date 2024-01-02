import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface PersonalData {
  key: number;
  nameTitle: string;
  firstName: string;
  lastName: string;
  fullName: string;
  birthday: string;
  nationality: string;
  gender: string;
  id0: string;
  id1: string;
  id2: string;
  id3: string;
  id4: string;
  id5: string;
  idNumber?: string;
  passport?: string;
  prefixTelephone: string;
  suffixTelephone: string;
  telephoneNumber: string;
  expectedSalary: string;
}

type FormState = {
  formData: PersonalData;
  option: string[];
  selectOption: string;
  errorIdNumber: boolean;
  resultData: PersonalData[];
  tempData: Pick<
    PersonalData,
    | "key"
    | "nameTitle"
    | "firstName"
    | "lastName"
    | "fullName"
    | "birthday"
    | "nationality"
    | "gender"
    | "id1"
    | "id2"
    | "id3"
    | "id4"
    | "id5"
    | "passport"
    | "prefixTelephone"
    | "suffixTelephone"
    | "expectedSalary"
  >;
};

const initialValue: FormState = {
  formData: {
    key: 0,
    nameTitle: "",
    firstName: "",
    lastName: "",
    fullName: "",
    birthday: "",
    nationality: "",
    gender: "",
    id0: "",
    id1: "",
    id2: "",
    id3: "",
    id4: "",
    id5: "",
    idNumber: "",
    passport: "",
    prefixTelephone: "",
    suffixTelephone: "",
    telephoneNumber: "",
    expectedSalary: "",
  },
  option: Array.from(
    { length: 100 },
    (_, i) => `+${String(i).padStart(2, "0")}`
  ),
  selectOption: "",
  errorIdNumber: false,
  resultData: [],
  tempData: {
    key: 0,
    nameTitle: "",
    firstName: "",
    lastName: "",
    fullName: "",
    birthday: "",
    nationality: "",
    gender: "",
    id1: "",
    id2: "",
    id3: "",
    id4: "",
    id5: "",
    passport: "",
    prefixTelephone: "",
    suffixTelephone: "",
    expectedSalary: "",
  },
};

const formSlice = createSlice({
  name: "form",
  initialState: initialValue,
  reducers: {
    errorIdNumberState: (state: FormState, action: PayloadAction<boolean>) => {
      state.errorIdNumber = action.payload;
    },
    sendFormData: (state: FormState, action: PayloadAction<PersonalData>) => {
      const newData = {
        ...action.payload,
      }
      state.resultData.push(newData);
      Object.keys(state.tempData).forEach((key) => {
        (state.tempData as any)[key] = ""; // Type assertion
      });
    },
    tempFormData: (state: FormState, action: PayloadAction<object>) => {
      state.tempData = {
        ...state.tempData,
        ...action.payload,
      };
    },
    clearFormData: (state: FormState, action: PayloadAction<void>) => {
      Object.keys(state.tempData).forEach((key) => {
        (state.tempData as any)[key] = ""; // Type assertion
      });
    },
  },
});

export const { errorIdNumberState, sendFormData, tempFormData, clearFormData } =
  formSlice.actions;
export const formSelector = (store: RootState) => store.formReducer;
export default formSlice.reducer;
