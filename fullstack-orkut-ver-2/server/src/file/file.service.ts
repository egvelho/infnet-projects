import fs from "fs/promises";
import sharp from "sharp";
import { Service } from "typedi";

@Service()
export class FileService {
  async getFile(path: string, width: number, height: number) {
    const fileBuffer = await fs.readFile(`public/${path}`);
    const resizedImageBuffer = await sharp(fileBuffer)
      .resize({
        width,
        height,
        fit: "cover",
        position: "center",
      })
      .toBuffer();
    return resizedImageBuffer;
  }
}
