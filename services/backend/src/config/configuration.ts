export const loadConfiguration = () => ({
	upstream: {
		sentry: {
			dsn: process.env.SENTRY_DSN ?? "",
		},
		stripe: {
			apiKey: process.env.STRIPE_API_KEY ?? "",
			apiVersion: process.env.STRIPE_API_VERSION ?? "2022-11-15",
		},
	},
});

export type Config = ReturnType<typeof loadConfiguration>;
