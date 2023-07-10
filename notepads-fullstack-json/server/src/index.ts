import express from "express";
import { notepadController } from "./notepad/notepad.controller";
import { commentController } from "./comment/comment.controller";

const app = express();
const host = "0.0.0.0";
const port = 8080;

app.use(express.static("public"));
app.use(express.json());

app.use("/notepads", notepadController);
app.use("/comments", commentController);

app.listen(port, host, () => {
  console.log(`Servidor express iniciado em http://${host}:${port}`);
});
