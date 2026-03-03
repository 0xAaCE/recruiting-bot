import express, { Request, Response } from 'express';
import { logger } from '@repo/utils';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'recruiting-bot-server' });
});

app.listen(PORT, () => {
  logger.info({ port: PORT }, 'Server running');
});
