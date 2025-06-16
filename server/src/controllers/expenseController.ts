import { Request, Response } from 'express';
import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

export const getExpensesByCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const getExpensiveCategoryRaw = await prisma.expenseByCategory.findMany({
      orderBy: {
        date: 'desc',
      },
    });
    const expenseByCategorySummary = getExpensiveCategoryRaw.map((item) => ({
      ...item,
      amount: item.amount.toString(),
    }));
    res.json(expenseByCategorySummary);
  } catch (error) {
    res.status(500).json({ message: 'Error Retriving Expense by category!!' });
  }
};
