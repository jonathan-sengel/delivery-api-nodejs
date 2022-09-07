import { validateNewOrder, validateOrderUpdate } from "../models/order.schema.js";
import OrdersRepository from '../repository/orders.repository.js'

class OrderControler {
    async getOrders(req, res, next) {
        res.send(await OrdersRepository.getOrders());
    }

    async newOrder(req, res, next) {
        const orderIsValid = validateNewOrder(req.body)
        if (orderIsValid === true) {
            const preOrder = req.body;
            res.send(await OrdersRepository.newOrder(preOrder));
        } else {
            res.status(400).send(orderIsValid);
        }
    }

    async updateOrder(req, res, next) {
        const orderIsValid = validateOrderUpdate(req.body);
        if (orderIsValid === true) {
            const orderToUpdate = req.body;
            res.send(await OrdersRepository.updateOrder(orderToUpdate));
        } else {
            res.status(400).send(orderIsValid);
        }
    }
}

export default new OrderControler();