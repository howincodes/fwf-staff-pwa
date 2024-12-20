import { AuthSliceState } from "@/types/auth/auth-types";
import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";


export const authInitialState: AuthSliceState = {
  user: undefined,
  isLoading: false,
  isError: false,
  errorMessage: "",
  currentPhone: "",
};

  const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    logout: (state) => {
      state.user = undefined;
      localStorage.removeItem("user");
      localStorage.removeItem("recentSearches");
    },
    loadUser: (state) => {
      state.user = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")!)
        : null;
    },
    setCurrentPhone: (state, { payload }) => {
      state.currentPhone = payload;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
  },
  extraReducers: (builder) => {
    // builder.addMatcher(
    //     authApi.endpoints.verifyOtp.matchFulfilled,
    //     (state, { payload }) => {

    //         if (payload?.phone && payload?.otp) {
    //             state.user = payload.phone;
    //             localStorage.setItem("user", JSON.stringify(payload?.data));
    //           }

    //     }
    // )
    builder.addMatcher(
        authApi.endpoints.verifyOtp.matchFulfilled,
        (state, { payload }) => {
            console.log("payload", payload); // Log the payload to check its structure
            if (payload?.user) {
                state.user = payload.user;
                localStorage.setItem("user", JSON.stringify(payload?.user));
            }
        }
    )    
        .addMatcher(
            authApi.endpoints.register.matchFulfilled,
            (state, { payload }) => {

                if (payload?.user) {
                    state.user = payload.user
                    localStorage.setItem("user", JSON.stringify(payload?.user))
                }
            }
        )
        // .addMatcher(
        //     authApi.endpoints.getUserData.matchFulfilled,
        //     (state, { payload }) => {

        //         if (payload?.user) {
        //             state.user = payload.user
        //             localStorage.setItem("user", JSON.stringify(payload?.user))
        //         }
        //     }
        // )

},
});

export const { logout, loadUser, setCurrentPhone, setUser } = authSlice.actions;
export default authSlice.reducer;
