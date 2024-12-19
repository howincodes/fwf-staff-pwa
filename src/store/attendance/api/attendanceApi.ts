
import { baseApi } from "@/config/base-api"
import { getWorkUpdatesResponse } from "@/types/attendance/attendace-types"



export const attendanceApi = baseApi.enhanceEndpoints({
    addTagTypes: ["attendance"],
}).injectEndpoints({
    endpoints: (builder) => ({
           getWorkUpdates: builder.query<getWorkUpdatesResponse, void>({
            query: () => ({
                url: "/get-work-updates",
                method: "POST",
            }),

           
        }),

        // register: builder.mutation<RegResp,RegReq>({
        //     query: (data) => ({
        //         url: "/register",
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "multipart/form-data",
        //         },
        //         data: data
        //     }),

        // }),
    })
})
export const {
    useGetWorkUpdatesQuery
} = attendanceApi