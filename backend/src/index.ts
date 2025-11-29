import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import servicesRoutes from './routes/servicesRoutes';
import appointmentsRoutes from './routes/appointmentsRoutes';

dotenv.config();

const app = express();
app.use(express.json());

const corsOrigin = process.env.CORS_ORIGIN || "*";
app.use(cors({
  origin: corsOrigin
}));

app.use(servicesRoutes);
app.use(appointmentsRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📡 CORS permitido para: ${corsOrigin}`);
});