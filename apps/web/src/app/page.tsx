"use client";

import { useState } from "react";

import { useUser } from "@/redux/slices/user";
import { useSupabase } from "@/supabase";

export default function Root() {
	const user = useUser();
	const supabase = useSupabase();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<form
			onSubmit={(ev): void => {
				ev.preventDefault();
				supabase.auth.signInWithPassword({ email, password });
			}}
		>
			<input
				type="text"
				name="email"
				placeholder="Email"
				onChange={(ev) => setEmail(ev.target.value)}
			/>
			<input
				type="password"
				name="password"
				placeholder="Password"
				onChange={(ev) => setPassword(ev.target.value)}
			/>
			<button type="submit">Sign In</button>
		</form>
	);
}
