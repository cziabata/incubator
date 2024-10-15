import {Response, Request} from 'express';
import {db} from '../db/db';

const products = db.products;

export const getProductsController = (req: Request, res: Response) => {
  if(req.params.title) {
    const searchString = req.params.title;
    res.send(products.filter(p => p.title.indexOf(searchString) > 1))
  } else {
    res.send(products)
  }
  res.send(products);
}

export const getProductByIdController = (req: Request, res: Response) => {
  const product = products.find(p => p.id === +req.params.id);
  if(product) res.send(product);
  else res.send(404);
}

export const deleteProductController = (req: Request, res: Response) => {
  for(let i = 0; i < products.length; i++) {
    if(products[i].id === +req.params.id) {
      products.splice(i, 1);
      res.send(204);
      return
    }
  }
  res.send(404);
}

export const createProductController = (req: Request, res: Response) => {
  const newProduct = {
    id: products.length,
    title: req.body.title,
  }

  products.push(newProduct);
  res.status(201).send(newProduct);
}

export const updateProductController = (req: Request, res: Response) => {
  const product = products.find(p => p.id === +req.params.id);
  if(product){ 
    product.title = req.body.title;
    res.send(product)
  } else {
    res.send(404)
  };
}