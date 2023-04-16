import { Module } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { UploadsController } from './uploads.controller';
// import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


@Module({
  // imports: [
  //   ServeStaticModule.forRoot({
  //     rootPath: join(__dirname, '..', "production_media"),
  //   })
  // ],
  controllers: [UploadsController],
  providers: [UploadsService],
})
export class UploadsModule {}
