import {Response, Request} from 'express';
import { adressesRepository } from '../repositories/local-db/adresses-repository';

export const getAdressesController = (req: Request, res: Response) => {
  const adresses = adressesRepository.getAdresses()
  res.send(adresses);
}

export const getAdresseByIdController = (req: Request, res: Response) => {
  const adress = adressesRepository.getAdressById(+req.params.id);
  if(adress) res.send(adress);
  else res.send(404);
}