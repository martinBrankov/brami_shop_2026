import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log("Prisma connected successfully.");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unknown database connection error";

      this.logger.warn(
        `Prisma could not connect during startup. The API will continue to boot, but database-backed routes will fail until DATABASE_URL is fixed. ${message}`,
      );
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
