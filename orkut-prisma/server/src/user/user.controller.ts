import {
  JsonController,
  Get,
  Param,
  Authorized,
  CurrentUser,
} from "routing-controllers";
import { Service } from "typedi";
import { UserService } from "./user.service";
import { User } from "./user.types";

@Service()
@JsonController("/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll() {
    const users = await this.userService.findAll();
    return users;
  }

  @Get("/:id")
  async getOne(@Param("id") id: string) {
    const user = await this.userService.findOne(+id);
    return user;
  }

  @Authorized()
  @Get("/auth/myself")
  async getMyself(@CurrentUser() user: User) {
    return user;
  }

  @Authorized()
  @Get("/auth/myself/friends")
  async getMyselfFriends(@CurrentUser() user: User) {
    const friends = await this.userService.findLatestFriends(user.id);
    return friends;
  }

  @Get("/:id/friends")
  async getFriends(@Param("id") id: string) {
    const friends = await this.userService.findFriends(+id);
    return friends;
  }

  @Get("/:id/latest-friends")
  async getLatestFriends(@Param("id") id: string) {
    const friends = await this.userService.findLatestFriends(+id);
    return friends;
  }
}
