import { Action } from "routing-controllers";

export async function currentUserChecker(action: Action) {
  return action.request.user;
}
