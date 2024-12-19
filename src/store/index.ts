
// import { combineReducers, configureStore } from "@reduxjs/toolkit";

// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
// import { baseApi } from "@/config/base-api";
// import { authApi } from "./auth/api/authApi";

// const reducers = {
// ...authApi
  
// };

// const rootReducer = combineReducers({
//   [baseApi.reducerPath]: baseApi.reducer,
//   ...reducers,
// });

// const persistConfig = {
//   key: "root",
//   storage,
//   version: 9,
//   blacklist: [
//     baseApi.reducerPath,
//   ],
// //   whitelist: ["auth",  ],
// //   stateReconciler: autoMergeLevel2,
// };
// const persistedReducer = persistReducer<ReturnType<typeof rootReducer>>(
//   persistConfig,
//   rootReducer
// );

// export const store = configureStore({
//   reducer: persistedReducer,
//   devTools: true,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     })
// });

// export const persistor = persistStore(store);
// export type RootState = ReturnType<typeof store.getState>;

// export type AppDispatch = typeof store.dispatch;



import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "@/config/base-api";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

// Types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
