import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const router = Router();

const prisma = new PrismaClient();

//
// User API
//
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

  const user = await prisma.user.create({
    data: {
      email: email,
      name: name === undefined ? "NoName" : name,
    },
  });

  res.json(user);
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { email, name } = req.body;

  const user = await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: {
      name: name,
      email: email,
    },
  });

  res.json(user);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const user = await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });

  res.json(user);
});

//
// Post API
//

router.get("/:id/posts", async (req, res) => {
  const { id } = req.params;

  // TODO: check user exists
  const posts = await prisma.post.findMany({
    where: {
      userId: Number(id),
    },
  });
  res.json(posts);
});

router.post("/:id/posts", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  // TODO: check user exists

  const post = await prisma.post.create({
    data: {
      title: title,
      content: content,
      userId: Number(id),
    },
  });

  res.json(post);
});

export { router as UserRouter };
