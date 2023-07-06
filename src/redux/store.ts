import { configureStore } from "@reduxjs/toolkit";

import { auth } from "./slices/auth";
import { user } from "./slices/user";

export const store = configureStore({
	reducer: {
		user: user.reducer,
		auth: auth.reducer,
	},
});
export type RootState = ReturnType<typeof store.getState>;
