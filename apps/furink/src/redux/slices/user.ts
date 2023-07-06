import { createSlice } from "@reduxjs/toolkit";

import { useAppSelector } from "../hooks";

type UserState =
	| {
			loggedIn: false;
	  }
	| {
			loggedIn: true;
			username: string;
	  };

const initialState: UserState = {
	loggedIn: false,
};

export const user = createSlice({
	name: "user",
	initialState,
	reducers: {},
});

export const useUser = () => useAppSelector((s) => s.user);
