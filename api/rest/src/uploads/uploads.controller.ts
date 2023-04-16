import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadsService } from './uploads.service';

@Controller('attachments')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('attachment[]'))
  async uploadFile(@UploadedFiles() attachment: Array<Express.Multer.File>) {
              //   const results = attachment.map(item => {
              //     return {
              //       id: item.size,
              //       original: item.originalname,
              //       thumbnail: `https://cdn.wallpapersafari.com/91/72/MZiwKY.jpg`
              //     };
              //   });
              //   return results;
    const uploadPromises = attachment.map(async (file) => {
      const buffer = file.buffer; // Access the file's buffer
      const fileName = file.originalname; // Access the file's name
      const savedUrl = await this.uploadsService.saveFile(buffer, fileName); // Call the service to save the file
      return {
        id: file.size,
        original: file.originalname,
        url: savedUrl // Include the saved URL in the result
      };
    });

    const results = await Promise.all(uploadPromises); // Wait for all files to be uploaded
    console.log("Uploaded results :: ", results);
    return results;
    }
}