import { Prisma, PrismaClient } from "@prisma/client";
import { Service } from "typedi";
import { User } from "./user.types";
import { MaybeOutput, Repository } from "../types";
import { getPool, sql } from "../database";

@Service()
export class UserRepository implements Repository<User> {
  constructor() {
    this.prisma = new PrismaClient();
  }
  prisma: PrismaClient;

  async findByEmailPassword(
    email: string,
    passwd: string
  ): Promise<User | null> {
    const user = await this.prisma.users.findFirst({
      where: {
        email,
        passwd,
      },
    });
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.users.findFirst({
      where: {
        email,
      },
    });
    return user;
  }

  async create(data: Partial<User>): Promise<MaybeOutput<User>> {
    const user = await this.prisma.users.create({
      data,
    });

    return {
      success: true,
      data: user,
    };
  }
  delete(id: number): Promise<MaybeOutput<User>> {
    throw new Error("Method not implemented.");
  }
  update(id: number, data: Partial<User>): Promise<MaybeOutput<User>> {
    throw new Error("Method not implemented.");
  }

  async findAll() {
    const pool = await getPool();
    const users = (await pool.many(sql`
        select * from users;
    `)) as User[];
    return users;
  }

  async findOne(userId: number) {
    const pool = await getPool();
    const user = await pool.one(sql`
    SELECT
      id,
      first_name,
      last_name,
      email,
      created_at,
      (cool * 3.0 / (SELECT MAX(cool) FROM users)) AS cool,
      (reliable * 3.0 / (SELECT MAX(reliable) FROM users)) AS reliable,
      (sexy * 3.0 / (SELECT MAX(sexy) FROM users)) AS sexy
    from users
    where id=${userId}
  `);
    return user;
  }

  async findFriends(userId: number) {
    const pool = await getPool();
    const friends = await pool.many(sql`
    SELECT id, first_name, last_name
    FROM users
    WHERE id IN (
      SELECT user_add
      FROM friends
      WHERE user_req=${userId}
      UNION
      SELECT user_req
      FROM friends
      WHERE user_add=${userId}
    )
    ORDER BY created_at DESC;
  `);

    const count: number = await pool.oneFirst(sql`
    SELECT COUNT(id)
    FROM friends
    WHERE user_add=${userId} OR user_req=${userId};
  `);

    return {
      friends,
      count,
    };
  }

  async findLatestFriends(userId: number) {
    const pool = await getPool();
    const friends = await pool.many(sql`
    SELECT id, first_name, last_name, (
      SELECT COUNT(*)
      FROM friends
      WHERE user_req = users.id OR user_add = users.id
    ) AS friends_count
    FROM users
    WHERE id IN (
      SELECT user_add
      FROM friends
      WHERE user_req=${userId}
    ) OR id IN (
      SELECT user_req
      FROM friends
      WHERE user_add=${userId}
    )
    ORDER BY created_at DESC
    LIMIT 9;
  `);

    const count: number = await pool.oneFirst(sql`
    SELECT COUNT(id)
    FROM friends
    WHERE user_add=${userId} OR user_req=${userId};
  `);

    return {
      friends,
      count,
    };
  }
}
