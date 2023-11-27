import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { userSlice } from "./reducers/userSlice";
import { alertsSlice } from "./reducers/alertsSlice";

const rootReducer = combineReducers({
  alerts: alertsSlice.reducer,
  user: userSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});
export default store;
