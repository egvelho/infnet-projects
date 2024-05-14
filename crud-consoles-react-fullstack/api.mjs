import express from "express";
import * as consoleCrud from "./consoleCrud.mjs";

const host = "localhost";
const port = 8080;

const api = express();
api.use(express.json());

api.post("/console", (req, res) => {
  const novoConsole = req.body;
  consoleCrud.createConsole(novoConsole);
  res.status(201).json({
    success: true,
  });
});

api.get("/console", (req, res) => {
  const listaDeConsoles = consoleCrud.listConsole();
  res.status(200).json(listaDeConsoles);
});

api.delete("/console/:fileNameConsole", (req, res) => {
  const { fileNameConsole } = req.params;
  const console_ = consoleCrud.readConsole(fileNameConsole);
  consoleCrud.deleteConsole(fileNameConsole);
  res.status(200).json(console_);
});

api.put("/console/:fileNameConsole", (req, res) => {
  const { fileNameConsole } = req.params;
  const console_ = req.body;
  consoleCrud.editConsole(fileNameConsole, console_);
  res.status(200).json(console_);
});

api.listen(port, host, () => {
  console.log(`Servidor iniciado em http://${host}:${port}`);
});
