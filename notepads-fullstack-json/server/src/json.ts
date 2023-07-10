import fs from "fs";
import path from "path";

function isJSON(path: string) {
  return path.endsWith(".json");
}

function fileExists(path: string) {
  return fs.existsSync(path);
}

// Lê um arquivo JSON
export function readJSON(...jsonFile: string[]) {
  const jsonFilePath = path.join(...jsonFile);

  if (fileExists(jsonFilePath) && isJSON(jsonFilePath)) {
    return JSON.parse(fs.readFileSync(jsonFilePath).toString());
  } else {
    throw new Error("Esse arquivo não existe!");
  }
}

// Cria um arquivo JSON
export function createJSON(
  jsonFile: string[],
  jsonContent: any,
  indentSize = 2
) {
  const jsonFilePath = path.join(...jsonFile);

  if (!fileExists(jsonFilePath) && isJSON(jsonFilePath)) {
    fs.writeFileSync(
      jsonFilePath,
      JSON.stringify(jsonContent, null, indentSize)
    );
  } else {
    throw new Error("Já existe um arquivo nesse caminho!");
  }
}

// Apaga um arquivo JSON
export function deleteJSON(...jsonFile: string[]) {
  const jsonFilePath = path.join(...jsonFile);

  if (fileExists(jsonFilePath) && isJSON(jsonFilePath)) {
    return fs.unlinkSync(jsonFilePath);
  } else {
    throw new Error("Não é um caminho para um arquivo JSON");
  }
}

// Sobrescreve um arquivo JSON
export function overwriteJSON(
  jsonFile: string[],
  jsonContent: any,
  indentSize = 2
) {
  const jsonFilePath = path.join(...jsonFile);

  if (fileExists(jsonFilePath) && isJSON(jsonFilePath)) {
    fs.writeFileSync(
      jsonFilePath,
      JSON.stringify(jsonContent, null, indentSize)
    );
  } else {
    throw new Error("Esse arquivo não existe!");
  }
}

// Atualiza parcialmente um arquivo JSON
export function updateJSON(
  jsonFile: string[],
  jsonContent: any,
  indentSize = 2
) {
  const jsonFilePath = path.join(...jsonFile);

  if (!fileExists(jsonFilePath) || !isJSON(jsonFilePath)) {
    throw new Error("Esse arquivo não existe!");
  }

  const currentJsonContent = JSON.parse(
    fs.readFileSync(jsonFilePath).toString()
  );
  const nextJsonContent = {
    ...currentJsonContent,
    ...jsonContent,
  };
  fs.writeFileSync(
    jsonFilePath,
    JSON.stringify(nextJsonContent, null, indentSize)
  );
}

export function listJSON(...jsonPath: string[]) {
  const files = fs.readdirSync(path.join(...jsonPath));
  return files.filter((file) => file.endsWith(".json"));
}
