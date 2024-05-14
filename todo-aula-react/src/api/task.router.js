import express, { Router } from "express";
import { prisma } from "./prisma.js";
import * as yup from "yup";

const stepSchema = yup
  .string()
  .matches(
    /Para fazer|Em andamento|Pronto/,
    'Os passos devem ser "Para fazer", "Em andamento" ou "Pronto".'
  );
const taskSchema = yup.object({
  user: yup.string().required("É necessário informar o usuário"),
  title: yup.string().required("É necessário informar o título da tarefa"),
  description: yup
    .string()
    .required("É necessário informar a descrição da tarefa"),
  step: stepSchema,
});

const updateStepSchema = yup.object({
  step: stepSchema.required("É necessário informar o novo estado da tarefa"),
});

export const taskRouter = Router();

taskRouter.get("/:user/tasks", async (req, res) => {
  const tasks = await prisma.task.findMany({
    where: {
      user: req.params.user,
    },
  });
  res.status(200).json(tasks);
});

taskRouter.get("/:user/tasks/:id", async (req, res) => {
  const user = await prisma.task.findFirst({
    where: {
      id: +req.params.id,
      user: req.params.user,
    },
  });

  res.status(200).json(user);
});

taskRouter.post("/:user/tasks", async (req, res) => {
  req.body && (req.body.user = req.params.user);
  try {
    const newTask = await taskSchema.validate(req.body);
    const task = await prisma.task.create({ data: newTask });
    res.status(201).json(task);
  } catch (error) {
    res.status(422).json(error);
  }
});

taskRouter.put("/:user/tasks/:id", async (req, res) => {
  try {
    req.body && (req.body.user = req.params.user);
    const newTask = await taskSchema.validate(req.body);
    const task = await prisma.task.update({
      data: newTask,
      where: {
        user: req.body.user,
        id: +req.params.id,
      },
    });
    res.status(200).json(task);
  } catch (error) {
    res.status(422).json(error);
  }
});

taskRouter.patch("/:user/tasks/:id/update-step", async (req, res) => {
  try {
    const newTask = await updateStepSchema.validate(req.body);
    const task = await prisma.task.update({
      data: newTask,
      where: {
        user: req.body.user,
        id: +req.params.id,
      },
    });
    res.status(200).json(task);
  } catch (error) {
    res.status(422).json(error);
  }
});

taskRouter.delete("/:user/tasks/:id", async (req, res) => {
  try {
    req.body && (req.body.user = req.params.user);
    const task = await prisma.task.delete({
      where: {
        user: req.body.user,
        id: +req.params.id,
      },
    });
    res.status(200).json(task);
  } catch (error) {
    res.status(422).json(error);
  }
});
