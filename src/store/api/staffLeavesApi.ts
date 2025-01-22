
import { baseApi } from "@/config/base-api";
import { ApplyLeaveRequest, ApplyLeaveResponse, GetStaffLeaveRecordResponse } from "@/types/staff-leave-types";


export const staffLeavesApi = baseApi.enhanceEndpoints({
  addTagTypes: ["staffLeaves"],
}).injectEndpoints({
  endpoints: (builder) => ({
    applyLeave: builder.mutation<ApplyLeaveResponse, ApplyLeaveRequest>({
      query: (data) => ({
        url: "/apply-leave",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
      },
        data,
      
      }),
    }),

    getStaffLeaveRecord : builder.query <GetStaffLeaveRecordResponse,void>({
        query: () => ({
            url: "/get-leave-record",
            method: "POST",
        }),
    }),
   
  }),
});

export const {
  useApplyLeaveMutation,
  useLazyGetStaffLeaveRecordQuery,
} = staffLeavesApi;
