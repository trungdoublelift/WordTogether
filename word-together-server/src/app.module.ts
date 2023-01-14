import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentGateWay } from './document/document.gateway';
import { DocumentModule } from './document/document.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [DocumentModule, UserModule],
  controllers: [AppController],
  providers: [AppService, DocumentGateWay],
})
export class AppModule {}
