import { prisma } from "../prisma";
import bcrypt from "bcrypt";
import { Service } from "typedi";
import type { CreateUserDto } from "./dtos/create-user.dto";
import type { UpdateUserDto } from "./dtos/update-user.dto";

@Service()
export class UserRepository {
  async createUser(data: CreateUserDto) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(data.password, salt);

    const user = await prisma.users.create({
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
        avatar: data.avatar ?? "/default-avatar.png",
        passwd: hash,
        email: data.email,
      },
    });
    return user;
  }

  async updateUser(userId: number, data: UpdateUserDto) {
    let passwd: string | undefined;

    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(data.password, salt);
      passwd = hash;
    }

    const user = await prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        passwd,
      },
    });
    return user;
  }

  async readUser(userId: number) {
    const user = await prisma.users.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  async listUsers() {
    const users = await prisma.users.findMany();
    return users;
  }

  async checkIsFriend(userId: number, friendId: number) {
    const maybeFriend = await prisma.friends.findFirst({
      where: {
        OR: [
          {
            user_a: userId,
            user_b: friendId,
          },
          {
            user_a: friendId,
            user_b: userId,
          },
        ],
      },
    });

    const isFriend = maybeFriend !== null;
    return isFriend;
  }

  async addFriend(userId: number, friendId: number) {
    const friend = await prisma.friends.create({
      data: {
        user_a: userId,
        user_b: friendId,
      },
    });
    return friend;
  }

  async removeFriend(userId: number, friendId: number) {
    const friend = await prisma.friends.findFirst({
      where: {
        OR: [
          {
            user_a: userId,
            user_b: friendId,
          },
          {
            user_a: friendId,
            user_b: userId,
          },
        ],
      },
    });

    await prisma.friends.delete({
      where: {
        id: friend?.id,
      },
    });

    return friend;
  }

  async listLatestFriends(userId: number) {
    const friends = await prisma.$queryRaw/* sql */ `
        select * from users where id in (
          select user_b
          from friends
          where user_a = ${userId}
          union
          select user_a
          from friends
          where user_b = ${userId}
        )
        order by created_at desc
        limit 9;`;
    return friends;
  }

  async updateAvatar(userId: number, avatar: string) {
    const user = await prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        avatar,
      },
    });
    return user;
  }
}
