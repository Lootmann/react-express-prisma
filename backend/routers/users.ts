import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const router = Router();

const prisma = new PrismaClient();

router.get("/", async (_, res) => {
  const users = await prisma.user.findMany();

  res.json(users);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.json(user);
});

router.post("/", async (req, res) => {
  // when some req.body fields are empty, req.body.field will be 'undefined'.
  const { email, name } = req.body;

  const post = await prisma.user.create({
    data: {
      email: email,
      name: name === undefined ? "NoName" : name,
    },
  });

  res.json(post);
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { email, name } = req.body;

  const post = await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: {
      name: name,
      email: email,
    },
  });

  res.json(post);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const post = await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });

  res.json(post);
});

export { router as UserRouter };
