import cors from "cors";
import express from "express";
import { PrismaClient } from "@prisma/client";
// import { z } from "zod";

//
// express
//
const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//
// prisma
//
const prisma = new PrismaClient();

app.get("/", async (_, res) => {
  res.json({ msg: "HI :^)" });
});

app.get("/users", async (_, res) => {
  const users = await prisma.user.findMany();

  res.json(users);
});

app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  if (id && typeof id !== "string") {
    res.json({ msg: "hoge" });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.json(user);
});

app.post("/users", async (req, res) => {
  // NOTE: when some req.body fields  are empty, req.body.field will be 'undefined'.
  const { email, name } = req.body;

  const post = await prisma.user.create({
    data: {
      email: email,
      name: name === undefined ? "NoName" : name,
    },
  });

  res.json(post);
});

app.listen(PORT, () => console.log(`🌞🌞🌞 Listening on ${PORT} 🌞🌞🌞`));
