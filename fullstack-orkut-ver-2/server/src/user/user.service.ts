import { BadRequestError } from "routing-controllers";
import { Service } from "typedi";
import { UserRepository } from "./user.repository";
import fs from "fs/promises";
import sharp from "sharp";

@Service()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async addFriend(userId: number, friendId: number) {
    const isFriend = await this.userRepository.checkIsFriend(userId, friendId);

    if (isFriend) {
      throw new BadRequestError("Você já adicionou esse usuário.");
    }

    const friend = await this.userRepository.addFriend(userId, friendId);
    return friend;
  }

  async removeFriend(userId: number, friendId: number) {
    const isFriend = await this.userRepository.checkIsFriend(userId, friendId);

    if (!isFriend) {
      throw new BadRequestError("Você não adicionou esse usuário.");
    }

    const friend = await this.userRepository.removeFriend(userId, friendId);
    return friend;
  }

  async uploadAvatar(userId: number, avatar: Express.Multer.File) {
    const avatarBuffer = await sharp(avatar.buffer)
      .resize({
        width: 256,
        height: 256,
        fit: "cover",
        position: "center",
      })
      .toBuffer();
    await fs.writeFile(`public/${userId}.jpg`, avatarBuffer);
    const avatarPath = `http://localhost:${process.env.PORT}/public/${userId}.jpg`;
    const user = await this.userRepository.updateAvatar(userId, avatarPath);
    return user;
  }
}
