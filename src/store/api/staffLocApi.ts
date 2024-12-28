import { baseApi } from "@/config/base-api";
import { LiveLocationReq, LiveLocationResp } from "@/types/common";

export const attendanceApi = baseApi.enhanceEndpoints({
    addTagTypes: ["attendance"],
}).injectEndpoints({
    endpoints: (builder) => ({

           trackLoc: builder.mutation<LiveLocationResp,LiveLocationReq>({
            query: (data) => ({
                url: "/track-location",
                method: "POST",
               data
           }),
            })

        })})


export const { useTrackLocMutation } = attendanceApi        