import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import settingsReducer from "./settingsSlice";

import { api } from "api";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, api.reducer);

const store = configureStore({
  reducer: {
    settings: settingsReducer,
    api: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(api.middleware),
});

// Create a persistor to persist the store
const persistor = persistStore(store);

export { store, persistor };
