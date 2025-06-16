import { Request, Response } from 'express';
import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const getUsers = await prisma.users.findMany();
    res.json(getUsers);
  } catch (error) {
    res.status(500).json({ message: 'Error Retriving Users!!' });
  }
};
