import { faker } from "@faker-js/faker";
import * as commentService from "./comment.service";
import * as notepadService from "../notepad/notepad.service";

const notepadsIds = notepadService
  .findNotepads({
    limit: Infinity,
  })
  .notepads.map(({ id }) => id);

const count = 1000;

for (let index = 0; index < count; index++) {
  commentService.createComment(generateComment());
}

function generateComment() {
  return {
    notepad_id: notepadsIds[Math.ceil(Math.random() * notepadsIds.length - 1)],
    message: faker.lorem.words(10 + Math.round(Math.random() * 15)),
  };
}
