import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllPosts = async (userId: number) => {
  return await prisma.post.findMany({
    where: {
      userId: userId,
    },
  });
};

export const findById = async (userId: number, postId: number) => {
  return await prisma.post.findFirst({
    where: {
      id: postId,
      userId: userId,
    },
  });
};

export const createPost = async (
  title: string,
  content: string,
  userId: number
) => {
  return await prisma.post.create({
    data: {
      title: title,
      content: content,
      userId: userId,
    },
  });
};
