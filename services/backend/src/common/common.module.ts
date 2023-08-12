import { Global, Module } from "@nestjs/common";

import { PrismaService } from "./providers/prisma.service";

@Module({
	exports: [PrismaService],
	providers: [PrismaService],
})
@Global()
export class CommonModule {}
