import { supabase } from "@/supabase";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Session, User } from "@supabase/supabase-js";

type AuthState =
	| {
			isAuthenticated: false;
	  }
	| {
			isAuthenticated: true;
			accessToken: string;
	  };

interface RegisterPayload {
	email: string;
	password: string;
}

interface LoginPayload {
	email: string;
	password: string;
}

export const register = createAsyncThunk<
	| { success: false; error: unknown }
	| { success: true; user: User | null; session: Session | null },
	RegisterPayload
>("auth/register", (data: RegisterPayload) =>
	supabase.auth
		.signUp({
			email: data.email,
			password: data.password,
		})
		.then(
			(res) => ({ success: true, ...res.data }),
			(err: unknown) => ({ success: false, error: err })
		)
);

export const loginWithPassword = createAsyncThunk(
	"auth/loginWithPassword",
	async (data: LoginPayload) =>
		supabase.auth.signInWithPassword(data).then(
			(res) => ({ success: true, ...res.data }),
			(err) => ({ success: false, error: err as unknown })
		)
);

export const auth = createSlice({
	name: "auth",
	initialState: {
		isAuthenticated: false,
	} as AuthState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(register.fulfilled, (state, action) => {
			if (action.payload.success) {
				state.isAuthenticated = true;
			}
		});
		builder.addCase(loginWithPassword.fulfilled, (state, action) => {
			if (action.payload.success) {
				state = {
					accessToken: action.payload.session,
					isAuthenticated: true,
				};
			}
		});
	},
});
