import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError, ResponseType } from "axios";

interface ErrorData {
  message: string,
  show?: boolean
}

const initialErrorData: ErrorData = {
  message: "",
  show: false
}

const ErrorModalSlice = createSlice({
  name: "errorModal",
  initialState: initialErrorData,
  reducers: {
    showError(state, action: PayloadAction<ErrorData>) {
      state.message = action.payload.message
      state.show = true
    },

    hideError(state) {
      state.message = ""
      state.show = false
    }
  }
})

export const { showError, hideError } = ErrorModalSlice.actions
export default ErrorModalSlice.reducer