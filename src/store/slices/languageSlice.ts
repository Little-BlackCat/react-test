import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { useTranslation } from "react-i18next"

interface LanguageOptionType {
  value: string
  label: string
}

interface LanguageState {
  languageOptions: LanguageOptionType[]
  languageFromLocalStorage: string
}

const initialValue: LanguageState = {
  languageOptions: [
    { value: 'en', label: "langEn" },
    { value: 'th', label: "langTh" },
  ],
  languageFromLocalStorage: "en"
};

// ฟังก์ชัน action ที่ใช้ในการเปลี่ยนภาษา
export const changeLanguageAsync = createAsyncThunk(
  'changeLanguage/changeLanguageAsync',
  async (language: string) => {
    const { i18n } = useTranslation();
    await i18n.changeLanguage(language);
    return language;
  }
);

const languageSlice = createSlice({
  name: "changeLanguage",
  initialState: initialValue,
  reducers: {
    chageLanguage: (state: LanguageState, action: PayloadAction<string>) => {
      state.languageFromLocalStorage = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(changeLanguageAsync.fulfilled, (state, action) => {
      state.languageFromLocalStorage = action.payload;
    });
  },
})

export const { chageLanguage } = languageSlice.actions
export const languageSelector = (store: RootState) => store.languageReducer
export default languageSlice.reducer