import { Request, Response } from 'express';
import ServiceOrder from '../services/orders.service';
import CustomException from '../../../exceptions/custom.exception';
import { exceptions } from '../../../messages/exceptions';

export default class OrdersController {
  static async all(req: Request, res: Response) {
    try {
      const orders = await ServiceOrder.all();
      res.status(200).json({ orders });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async find(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const order = await ServiceOrder.find(id);

      res.status(200).json(order);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async create(req: Request, res: Response) {
    const { body } = req;

    try {
      const order = await ServiceOrder.create(body);

      res.status(201).json(order);
    } catch (error) {
      if (error instanceof CustomException) {
        res.status(error.getStatusCode()).json(error.toResponse());
      }
      res.status(500).json(exceptions.internalServer);
    }
  }
}
