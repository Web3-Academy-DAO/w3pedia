import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthData {
  user: {[key: string]: any},
  token: string,
  authenticated: boolean
}

const initialAuthState: AuthData = {
  user: {},
  token: "",
  authenticated: false
}

const AuthStoreSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setLoginState(state, action:PayloadAction<AuthData>) {
      console.log(`User ${action.payload.user.username} is now logged in`)
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.authenticated = true;
    },

    setLogoutState(state) {
      console.log("User has been logged out")
      state.user = {};
      state.token = "";
      state.authenticated = false;
    }
  }
})

export const { setLoginState, setLogoutState } = AuthStoreSlice.actions;
export default AuthStoreSlice.reducer;