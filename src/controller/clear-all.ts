import { Response, Request } from 'express';
import { clearAllRepository } from '../repositories/cllear-all-repository';

export const deleteAllController = (req: Request, res: Response) => {
  clearAllRepository.deleteAll();
  res.send(204);
}