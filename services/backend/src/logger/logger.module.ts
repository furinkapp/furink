import { UpstreamModule } from "src/upstream/upstream.module";

import { Global, Module } from "@nestjs/common";

import { Logger } from "./logger.service";

@Module({
	imports: [UpstreamModule],
	providers: [Logger],
})
@Global()
export class LoggerModule {}
