import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllUser = async () => {
  return await prisma.user.findMany();
};

export const findById = async (id: number) => {
  return await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });
};

export const createUser = async (email: string, name: string | undefined) => {
  return await prisma.user.create({
    data: {
      email: email,
      name: name === undefined ? "NoName" : name,
    },
  });
};

export const updateUser = async (
  id: number,
  email: string,
  name: string | undefined
) => {
  return await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: {
      name: name,
      email: email,
    },
  });
};

export const deleteUser = async (id: number) => {
  return await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });
};
