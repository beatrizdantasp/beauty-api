import { z } from 'zod';

export const updateServicoSchema = z.object({
  titulo: z.string().min(3, "Título muito curto").optional(),
  preco: z.preprocess((val) => Number(val), z.number().positive("Preço deve ser positivo")).optional(),
  categoria: z.string().optional()
});