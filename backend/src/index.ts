import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import servicesRoutes from './routes/servicesRoutes';
import appointmentsRoutes from './routes/appointmentsRoutes';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use(servicesRoutes);
app.use(appointmentsRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor Organizado rodando na porta ${PORT}`);
});