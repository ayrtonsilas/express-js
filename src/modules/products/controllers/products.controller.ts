import { Request, Response } from 'express';
import ServiceProduct from '../services/products.service';
import CustomException from '../../../exceptions/custom.exception';
import { exceptions } from '../../../messages/exceptions';

export default class ProductsController {
  
  static async all(req: Request, res: Response){
    try {
      const products = await ServiceProduct.all();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  
  static async find(req: Request, res: Response){
    const { name } = req.params;
    try {
      const product = await ServiceProduct.find(name);
      
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async create(req: Request, res: Response){
    const { body } = req;
    
    try {
      const product = await ServiceProduct.create(body);
      
      res.status(201).json(product);
    } catch (error) {
      if(error instanceof CustomException){
        res.status(error.getStatusCode()).json(error.toResponse());
      }
    

      res.status(500).json(exceptions.internalServer);
    }
  }
}