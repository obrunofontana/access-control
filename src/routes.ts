import express, { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export class Routes {

  public routes(app: express.Application): void {
    app.route('/').get(async (req: Request, res: Response) => {
      try {
        const companies = await prisma.company.findMany();
        return res.status(200).json({ message: companies });
      } catch (e) {
        return res.status(500).json({ message: e });
      }
    })
  }
}
