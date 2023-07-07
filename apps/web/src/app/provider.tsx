"use client";

import { ReduxProvider } from "@/redux";
import { SupabaseProvider } from "@/supabase";
import { GlobalStyle } from "@/theme";
import StyledComponentsRegistry from "@/theme/registry";

export const RootProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
	<ReduxProvider>
		<SupabaseProvider>
			<StyledComponentsRegistry>
				<GlobalStyle />
				{children}
			</StyledComponentsRegistry>
		</SupabaseProvider>
	</ReduxProvider>
);
