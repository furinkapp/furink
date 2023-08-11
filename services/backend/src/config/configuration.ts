export const loadConfiguration = () => ({
	upstream: {
		sentry: {
			dsn: process.env.SENTRY_DSN ?? "",
		},
	},
});

export type Config = ReturnType<typeof loadConfiguration>;
