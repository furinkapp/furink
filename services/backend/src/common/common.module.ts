import { Global, Module } from "@nestjs/common";

import { ConfigService } from "./providers/config.service";
import { PrismaService } from "./providers/prisma.service";
import { RedisService } from "./providers/redis.service";

@Module({
	exports: [ConfigService, PrismaService, RedisService],
	providers: [ConfigService, PrismaService, RedisService],
})
@Global()
export class CommonModule {}
