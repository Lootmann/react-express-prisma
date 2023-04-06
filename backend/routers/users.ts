import { createPost, findById as postFindById } from "../apis/posts";
import { getAllPosts } from "../apis/posts";
import { Router } from "express";
import {
  createUser,
  deleteUser,
  findById,
  getAllUser,
  updateUser,
} from "../apis/users";

const router = Router();

//
// User API
//
router.get("/", async (_, res) => {
  const users = await getAllUser();

  res.json(users);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const user = await findById(Number(id));
  res.json(user);
});

router.post("/", async (req, res) => {
  // when some req.body fields are empty, req.body.field will be 'undefined'.
  const { email, name } = req.body;

  const user = createUser(email, name);
  res.json(user);
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { email, name } = req.body;

  const user = await updateUser(Number(id), email, name);
  res.json(user);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const user = await deleteUser(Number(id));
  res.json(user);
});

//
// Post API
//
router.get("/:id/posts", async (req, res) => {
  const { id } = req.params;

  const posts = await getAllPosts(Number(id));
  res.json(posts);
});

router.get("/:id/posts/:postId", async (req, res) => {
  const { id, postId } = req.params;

  const post = await postFindById(Number(id), Number(postId));
  res.json(post);
});

router.post("/:id/posts", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const post = await createPost(title, content, Number(id));
  res.json(post);
});

export { router as UserRouter };
