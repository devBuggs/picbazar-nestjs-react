import { Module } from '@nestjs/common';
import { WebHookController } from './web-hook.controller';
import { WebHookService } from './web-hook.service';

@Module({
  controllers: [WebHookController],
  providers: [WebHookService],
})
export class WebHookModule {}
