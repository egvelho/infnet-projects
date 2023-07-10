import { faker } from "@faker-js/faker";
import * as notepadService from "./notepad.service";

const count = 100;

for (let index = 0; index < count; index++) {
  notepadService.createNotepad(generateNotepad());
}

function generateNotepad() {
  return {
    title: faker.lorem.words(5 + Math.round(Math.random() * 5)),
    subtitle: faker.lorem.words(10 + Math.round(Math.random() * 15)),
    content: faker.lorem.words(50 + Math.round(Math.random() * 100)),
  };
}
