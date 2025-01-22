
import { baseApi } from "@/config/base-api";
import { WorkUpdate } from "@/types/attendace-types";


export const attendanceApi = baseApi.enhanceEndpoints({
  addTagTypes: ["attendance"],
}).injectEndpoints({
  endpoints: (builder) => ({
    getWorkUpdates: builder.query<WorkUpdate[], void>({
      query: (token) => ({
        url: "/get-work-updates",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    createWorkUpdate: builder.mutation<void, { remarks: string; imageFile: File | null }>({
      query: ({ remarks, imageFile }) => ({
        url: "/create-work-update",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: {
          remarks,
          image: imageFile, // Include image file if present
        },
      }),
    }),
  }),
});

export const {
  useLazyGetWorkUpdatesQuery,
  useCreateWorkUpdateMutation, // Export the new mutation
} = attendanceApi;
