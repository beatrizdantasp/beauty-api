import { z } from 'zod';

export const agendamentoSchema = z.object({
  cliente_nome: z.string().min(3, "O nome precisa ter pelo menos 3 letras."),
  cliente_whatsapp: z.string().min(10, "WhatsApp incompleto."),
  data_agendamento: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data inválida (Use AAAA-MM-DD)."),
  horario: z.string(),
  servico_id: z.preprocess((val) => Number(val), z.number().positive())
});
