import { createClient, RedisClientType } from "redis";

const DEFAULT_REDIS_PORT = 6379;
const DEFAULT_MAXIMUM_SESSION_AGE = 60 * 60 * 24 * 7; // 7 days

export interface SessionClientOptions {
	host: string;
	port: number;
	maximumSessionAge: number;
}

export interface Session {
	id: string;
}

export class SessionClient {
	private readonly redis: RedisClientType;
	private readonly options: SessionClientOptions;

	constructor(options: Readonly<Partial<SessionClientOptions>>) {
		this.options = {
			host: "localhost",
			port: DEFAULT_REDIS_PORT,
			maximumSessionAge: 60 * 60 * 24 * 7, // 7 days
			...options,
		};
		this.redis = createClient({
			url: `redis://${this.options.host}:${this.options.port}`,
		});
	}

	async createSession(user: string): Promise<Session> {}
}
