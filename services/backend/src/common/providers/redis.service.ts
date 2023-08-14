import { Cluster } from "ioredis";

import { Injectable, OnModuleInit } from "@nestjs/common";

import { ConfigService } from "./config.service";

@Injectable()
export class RedisService extends Cluster implements OnModuleInit {
	constructor(config: ConfigService) {
		super(config.get("upstream.redis.clusters"));
	}

	onModuleInit() {
		return this.connect();
	}
}
