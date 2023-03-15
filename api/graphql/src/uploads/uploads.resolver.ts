import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Attachment } from 'src/common/entities/attachment.entity';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { UploadsService } from './uploads.service';
import { ReadStream } from 'fs-capacitor';

export interface FileUpload {
  filename: string;
  mimetype: string;
  encoding: string;

  createReadStream(): ReadStream;
}

@Resolver()
export class UploadsResolver {
  constructor(private readonly uploadsService: UploadsService) {}

  @Mutation(() => [Attachment])
  upload(
    @Args({
      name: 'attachment',
      type: () => [GraphQLUpload],
      nullable: 'itemsAndList',
    })
    attachment?: FileUpload,
  ) {
    console.log('upload', attachment);
    // return this.uploadsService.upload();
    return [
      {
        id: '1abc',
        original:
          'https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/881/aatik-tasneem-7omHUGhhmZ0-unsplash%402x.png',
        thumbnail:
          'https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/881/conversions/aatik-tasneem-7omHUGhhmZ0-unsplash%402x-thumbnail.jpg',
      },
    ];
  }
}
