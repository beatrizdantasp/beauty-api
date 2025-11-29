import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { agendamentoSchema } from '../schemas/appointmentsSchema';
import { z } from 'zod';

const prisma = new PrismaClient();

export class AppointmentsController {
  async store(req: Request, res: Response) {
    try {
      const data = agendamentoSchema.parse(req.body);
      
      const agendamento = await prisma.agendamentos.create({
        data: {
          cliente_nome: data.cliente_nome,
          cliente_whatsapp: data.cliente_whatsapp,
          data_agendamento: data.data_agendamento,
          horario: data.horario,
          servico_id: Number(data.servico_id)
        }
      });
      res.json(agendamento);
    } catch (err: any) {
      if (err instanceof z.ZodError) return res.status(400).json({ error: err.errors[0].message });
      if (err.code === 'P2002') return res.status(409).json({ error: 'Horário Indisponível' });
      res.status(500).json({ error: 'Erro ao agendar' });
    }
  }

  async index(req: Request, res: Response) {
    if (req.headers['x-senha-admin'] !== "admin123") return res.status(403).json({ error: 'Senha incorreta.' });

    const lista = await prisma.agendamentos.findMany({
      include: { servico: true },
      orderBy: [{ data_agendamento: 'desc' }, { horario: 'asc' }]
    });

    const formatado = lista.map((item: any) => ({ ...item, servico_titulo: item.servico.titulo }));
    res.json(formatado);
  }

  async delete(req: Request, res: Response) {
    if (req.headers['x-senha-admin'] !== "admin123") return res.status(403).json({ error: 'Senha incorreta.' });
    await prisma.agendamentos.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: 'Excluído' });
  }
}