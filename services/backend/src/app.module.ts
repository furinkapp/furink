import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { CommonModule } from "./common/common.module";
import { loadConfiguration } from "./config/configuration";

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [loadConfiguration],
		}),
		CommonModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
