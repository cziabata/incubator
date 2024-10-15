import {Response, Request} from 'express';
import {db} from '../db/db';

const adresses = db.adresses;

export const getAdressesController = (req: Request, res: Response) => {
  res.send(adresses);
}

export const getAdresseByIdController = (req: Request, res: Response) => {
  const adress = adresses.find(p => p.id === +req.params.id);
  if(adress) res.send(adress);
  else res.send(404);
}