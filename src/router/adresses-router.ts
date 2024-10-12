import { Router, Request, Response } from "express";

const adresses = [{id: 1, title: 'adress 1'}, {id: 2, title: 'street 2'}];

export const adressesRouter = Router();

adressesRouter.get("/", (req: Request, res: Response) => {
  res.send(adresses);
} )

adressesRouter.get("/:id", (req: Request, res: Response) => {
  const adress = adresses.find(p => p.id === +req.params.id);
  if(adress) res.send(adress);
  else res.send(404);
} )