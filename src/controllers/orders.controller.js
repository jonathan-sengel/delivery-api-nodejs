import { validateNewOrder, validateOrderUpdate, validateUpdateStatus } from "../models/order.schema.js";
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

    async updateStatus(req, res, next) {
        const dataIsValid = validateUpdateStatus(req.body);
        if (dataIsValid === true) {
            const orderToUpdate = req.body;
            res.send(await OrdersRepository.updateOrderStatus(orderToUpdate));
        } else {
            res.status(400).send(dataIsValid);
        }
    }
}

export default new OrderControler();