import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { CommonModule } from "./common/common.module";
import { loadConfiguration } from "./config/configuration";
import { OrdersModule } from "./orders/orders.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [loadConfiguration],
		}),
		CommonModule,
		OrdersModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
