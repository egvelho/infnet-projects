import express from "express";
import * as commentService from "./comment.service";

export const commentController = express.Router();

commentController.get("/", (req, res) => {
  const comments = commentService.findComments();
  res.status(200).json(comments);
});

commentController.post("/", (req, res) => {
  const response = commentService.createComment(req.body);
  res.status(201).json(response);
});
