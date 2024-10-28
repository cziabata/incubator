import { Response, Request } from 'express';
import { clearAllRepository } from '../repositories/mongo/cllear-all-repository';

export const deleteAllController = async (req: Request, res: Response) => {
  await clearAllRepository.deleteAll();
  res.send(204);
}