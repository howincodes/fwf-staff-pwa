import { baseApi } from "@/config/base-api";
import {   AttendanceReq,  DayByDayAttendance,  PunchInResp, PunchOutResp} from "@/types/staff-attendace-types";



export const attendanceApi = baseApi.enhanceEndpoints({
    addTagTypes: ["attendance"],
}).injectEndpoints({
    endpoints: (builder) => ({

           getAttendance: builder.query({
            query: () => ({
                url: "/get-attendances",
                method: "POST",
               
           }),
            }),

            punchIn: builder.mutation<PunchInResp,AttendanceReq>({ 
                query: (data) => ({
                    url: "/punch-in",
                    method: "POST",
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                     data
                }),
            }),

            punchOut: builder.mutation<PunchOutResp,AttendanceReq >({
                query: (data) => ({
                  url: `/punch-out`, 
                  method: "POST",
                  headers: {
                     "Content-Type": "multipart/form-data",
                  },
                  data, 
                }),
              }),


          
            getDayByDayAttendance: builder.query<DayByDayAttendance, { month?: string }>({
                query: ({ month }) => {
                    console.log('Month parameter:', month); // Debugging line
                    return {
                        url: `/get-day-by-day-attendance${month ? `?month=${month}` : ''}`,
                        method: "GET",
                    };
                },
            }),
            
             
        })})

export const { useGetAttendanceQuery, usePunchInMutation, usePunchOutMutation ,useGetDayByDayAttendanceQuery} = attendanceApi        