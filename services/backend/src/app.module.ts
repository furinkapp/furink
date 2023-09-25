import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { CommonModule } from "./common/common.module";
import { loadConfiguration } from "./config/configuration";
import { UsersModule } from "./users/users.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [loadConfiguration],
		}),
		CommonModule,
		UsersModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
