const HTTPS_PORT = 443;
const REDIS_PORT = 6379;

export const loadConfiguration = () => ({
	upstream: {
		sentry: {
			dsn: process.env.SENTRY_DSN ?? "",
		},
		stripe: {
			apiKey: process.env.STRIPE_API_KEY ?? "",
			apiVersion: process.env.STRIPE_API_VERSION ?? "2022-11-15",
		},
		typesense: {
			host: process.env.TYPESENSE_HOST ?? "",
			port: Number(process.env.TYPESENSE_PORT ?? HTTPS_PORT),
			apiKey: process.env.TYPESENSE_API_KEY ?? "",
			connectionTimeoutSeconds: Number(process.env.TYPESENSE_CONNECTION_TIMEOUT_SECONDS ?? 10),
			protocol: "https",
		},
		redis: {
			clusters: [
				{
					host: process.env.REDIS_HOST ?? "",
					port: Number(process.env.REDIS_PORT ?? REDIS_PORT),
				},
			],
		},
	},
});

export type Config = ReturnType<typeof loadConfiguration>;
