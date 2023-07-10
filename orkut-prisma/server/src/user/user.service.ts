import { Service } from "typedi";
import { UserRepository } from "./user.repository";
import { User } from "./user.types";

@Service()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(userData: Partial<User>) {
    const user = await this.userRepository.create(userData);
    return user.data as User;
  }
  async findAll() {
    const users = await this.userRepository.findAll();
    return users;
  }
  async findOne(userId: number) {
    const user = await this.userRepository.findOne(userId);
    return user;
  }
  async findFriends(userId: number) {
    const friends = await this.userRepository.findFriends(userId);
    return friends;
  }
  async findLatestFriends(userId: number) {
    const latestFriends = await this.userRepository.findLatestFriends(userId);
    return latestFriends;
  }
  async findByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);
    return user;
  }
  async findByEmailPassword(email: string, password: string) {
    const user = await this.userRepository.findByEmailPassword(email, password);
    return user;
  }
}
