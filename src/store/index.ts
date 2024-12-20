
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



// // Types for RootState and AppDispatch

import { baseApi } from "@/config/base-api"; // Your API slice
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

import { configureStore } from "@reduxjs/toolkit";
import authSlice  from "./slice/authSlice";

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authSlice, // Your auth slice
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
    .concat(baseApi.middleware),
});

export const persistor = persistStore(store);


