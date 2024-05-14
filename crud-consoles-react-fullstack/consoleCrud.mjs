import { LocalStorage } from "node-localstorage";
import slugify from "slugify";
global.localStorage = new LocalStorage("./consoles");

export function createConsole(novoConsole) {
  const fileName = slugify(novoConsole.nomeDoConsole, {
    lower: true,
  });
  localStorage.setItem(
    fileName.concat(".json"),
    JSON.stringify({ ...novoConsole, fileName }, undefined, 2)
  );
}

export function listConsole() {
  return Object.values(localStorage).map((data) => JSON.parse(data));
}

export function deleteConsole(consoleFileName) {
  localStorage.removeItem(consoleFileName.concat(".json"));
}

export function readConsole(consoleFileName) {
  const console_ = localStorage.getItem(consoleFileName.concat(".json"));
  return console_;
}

export function editConsole(consoleFileName, console_) {
  localStorage.setItem(
    consoleFileName.concat(".json"),
    JSON.stringify(console_)
  );
}
