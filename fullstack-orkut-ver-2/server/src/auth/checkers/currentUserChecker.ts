import type { Action } from "routing-controllers";
import { JwtService, InvalidAuthorizationHeaderError } from "../jwt.service";
import { UserRepository } from "../../user/user.repository";

const jwtService = new JwtService();
const userRepository = new UserRepository();

export async function currentUserChecker(action: Action) {
  const payload = jwtService.extractTokenFromHeader(action.request);
  const user = await userRepository.findByEmail(payload.email);
  return user;
}
