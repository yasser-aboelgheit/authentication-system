import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { LoggingModule } from "./logging/logging.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      process.env.MONGODB_URI || "mongodb://localhost/auth-app",
    ),
    AuthModule,
    LoggingModule,
  ],
})
export class AppModule {}
