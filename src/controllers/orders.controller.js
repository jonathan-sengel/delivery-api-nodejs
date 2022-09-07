import { validateOrder } from "../models/order.schema.js";
import OrdersRepository from '../repository/orders.repository.js'

class OrderControler {
    async getOrders(req, res, next) {
        res.send(await OrdersRepository.getOrders());
    }

    async newOrder(req, res, next) {
        const orderIsValid = validateOrder(req.body)
        if (orderIsValid === true) {
            const preOrder = req.body;
            res.send(await OrdersRepository.newOrder(preOrder));
        } else {
            res.status(400).send(orderIsValid);
        }
    }
}

export default new OrderControler();