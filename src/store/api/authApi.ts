
import { baseApi } from "@/config/base-api"
import { LoginReq, LoginRes, OtpReq, OTPResp, RegReq, RegResp } from "@/types/auth-types"



export const authApi = baseApi.enhanceEndpoints({
    addTagTypes: ["auth"],
}).injectEndpoints({
    endpoints: (builder) => ({

        sendOtp: builder.mutation<LoginRes, LoginReq>({
            query: (data) => ({
                url: "/send-otp",
                method: "POST",
                data
            }),

        }),
        verifyOtp: builder.mutation<OTPResp, OtpReq>({
            query: (data) => ({
                url: "/verify-otp",
                method: "POST",
               data
            }),
        }),
        

        register: builder.mutation<RegResp,RegReq>({
            query: (data) => ({
                url: "/register",
                method: "POST",
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                data: data
            }),

        }),

        getUserData: builder.query({
            query: () => ({
                url: "/user",
                method: "GET",
            }),
            providesTags: ["auth"],


        }),

        // editUserData: builder.mutation({
        //     query: (data) => ({
        //         url: "/edit-user",
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "multipart/form-data",
        //         },
        //         data
        //     }),
        //     invalidatesTags: ["auth"],
        // }),
        // deleteAccountData: builder.mutation({
        //     query: (data) => ({
        //         url: "/delete-account",
        //         method: "POST",

        //         data
        //     }),
        //     invalidatesTags: ["auth"],
        // }),
    })
})
export const {
    useRegisterMutation,
    useGetUserDataQuery,
    useSendOtpMutation,
    useVerifyOtpMutation,
    // useDeleteAccountDataMutation,
    // useEditUserDataMutation
} = authApi