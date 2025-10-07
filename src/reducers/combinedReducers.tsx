import TaskReducer from "./taskReducer";
import { combineReducers } from "@reduxjs/toolkit";

const RootReducer = combineReducers({
    tasks: TaskReducer
})

export default RootReducer