import { Response, Request } from 'express';
import { productsRepository } from '../repositories/local-db/products-repository';

export const getProductsController = (req: Request, res: Response) => {
  const foundProducts = productsRepository.getProducts(req.params.title);
  res.send(foundProducts);
}

export const getProductByIdController = (req: Request, res: Response) => {
  const product = productsRepository.getProductById(+req.params.id);
  if (product) res.send(product);
  else res.send(404);
}

export const deleteProductController = (req: Request, res: Response) => {

  const isDeleted = productsRepository.deleteProduct(+req.params.id);
  if (isDeleted) {
    res.send(204);
  } else {
    res.send(404);
  }
}

export const createProductController = (req: Request, res: Response) => {
  const newProduct = productsRepository.createProduct(req.body.title);
  res.status(201).send(newProduct);
}

export const updateProductController = (req: Request, res: Response) => {
  const isProductUpdated = productsRepository.updateProduct(+req.params.id, req.body.title);
  if (isProductUpdated) {
    const updatedProduct = productsRepository.getProductById(+req.params.id)
    res.send(updatedProduct)
  } else {
    res.send(404)
  };
}