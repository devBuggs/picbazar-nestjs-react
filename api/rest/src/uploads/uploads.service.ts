import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';


@Injectable()
export class UploadsService {

  constructor() {}

  async saveFile(buffer: Buffer, filename: string): Promise<string> {
    const uploadDir = path.join(__dirname, '..', 'uploads'); // Set the upload directory path
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir); // Create the upload directory if it doesn't exist
    }

    const filePath = path.join(uploadDir, filename); // Generate the file path
    await fs.promises.writeFile(filePath, buffer); // Write the file to disk

    const url = `/uploads/${filename}`; // Generate the URL of the saved file
    return url;
  }

  
  findAll() {
    return `This action returns all uploads`;
  }

  findOne(id: number) {
    return `This action returns a #${id} upload`;
  }

  remove(id: number) {
    return `This action removes a #${id} upload`;
  }
  
}
