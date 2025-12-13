import path from "node:path";
import type { PrismaConfig } from "prisma";

export default {
  earlyAccess: true,
  schema: path.join(__dirname, "schema.prisma"),

  migrate: {
    async development() {
      return {
        url: process.env.NEW_DATABASE_URL!,
        directUrl: process.env.NEW_DIRECT_URL,
      };
    },
  },
} satisfies PrismaConfig;
