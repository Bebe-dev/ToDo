import TaskReducer from "./reducers/taskReducer";
import UserReducer from "./reducers/userReducer"
import { configureStore } from '@reduxjs/toolkit'


const store = configureStore({
    reducer: {
        tasks: TaskReducer,
        user: UserReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;

export default store