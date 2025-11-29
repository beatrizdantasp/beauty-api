import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { updateServicoSchema } from '../schemas/servicesSchema';
import { z } from 'zod';

const prisma = new PrismaClient();

export class ServicesController {
  // Listar
  async index(req: Request, res: Response) {
    const servicos = await prisma.servicos.findMany();
    res.json(servicos);
  }

  // Editar (Admin)
  async update(req: Request, res: Response) {
    if (req.headers['x-senha-admin'] !== "admin123") return res.status(403).json({ error: 'Senha incorreta.' });
    
    const { id } = req.params;
    try {
      const data = updateServicoSchema.parse(req.body);
      const servico = await prisma.servicos.update({ where: { id: Number(id) }, data });
      res.json(servico);
    } catch (err) {
      res.status(400).json({ error: 'Erro ao atualizar' });
    }
  }
}
