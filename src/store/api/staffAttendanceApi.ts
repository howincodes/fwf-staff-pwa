import { baseApi } from "@/config/base-api";
import { Attendance, AttendanceReq, DayByDayAttendance, PunchInResp, PunchOutResp} from "@/types/staff-attendace-types";



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
        getDayByDayAttendance: builder.query<DayByDayAttendance, void>({
            query: () => ({
                url: "/get-day-by-day-attendance",
                method: "GET",
               
           }),
        })
            
        })})

export const { useGetAttendanceQuery, usePunchInMutation, usePunchOutMutation ,useGetDayByDayAttendanceQuery} = attendanceApi        