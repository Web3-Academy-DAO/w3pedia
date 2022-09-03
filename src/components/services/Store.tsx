import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import AuthStoreSlice from "./AuthStoreSlice";
import ErrorModalSlice from "./ErrorModalSlice";

export const defaultStore = configureStore({
  reducer: {
    auth: AuthStoreSlice,
    error: ErrorModalSlice
  }
})

export type RootState = ReturnType<typeof defaultStore.getState>
export type AppDispatch = typeof defaultStore.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const storeWrapper = createWrapper(() => defaultStore)