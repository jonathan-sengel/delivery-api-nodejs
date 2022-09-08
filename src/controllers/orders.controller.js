import { validateDeleteOrder, validateNewOrder, validateOrderUpdate, validateTotalOrders, validateUpdateStatus } from "../models/order.schema.js";
import OrdersRepository from '../repository/orders.repository.js'

class OrderControler {
    async getOrders(req, res, next) {
        res.send(await OrdersRepository.getOrders());
    }

    async newOrder(req, res, next) {
        try {
            const orderIsValid = validateNewOrder(req.body)
            if (orderIsValid === true) {
                const preOrder = req.body;
                res.send(await OrdersRepository.newOrder(preOrder));
            } else {
                res.status(400).send(orderIsValid);
            }
        } catch (err) {
            next(err);
        }
    }

    async updateOrder(req, res, next) {
        try {
            const orderIsValid = validateOrderUpdate(req.body);
            if (orderIsValid === true) {
                const orderToUpdate = req.body;
                res.send(await OrdersRepository.updateOrder(orderToUpdate));
            } else {
                res.status(400).send(orderIsValid);
            }
        } catch (err) {
            next(err);
        }
    }

    async updateStatus(req, res, next) {
        try {
            const dataIsValid = validateUpdateStatus(req.body);
            if (dataIsValid === true) {
                const orderToUpdate = req.body;
                res.send(await OrdersRepository.updateOrderStatus(orderToUpdate));
            } else {
                res.status(400).send(dataIsValid);
            }
        } catch (err) {
            next(err);
        }
    }

    async deleteOrder(req, res, next) {
        try {
            const idIsValid = validateDeleteOrder(req.body);
            if (idIsValid === true) {
                const orderId = req.body.id;
                res.send(await OrdersRepository.deleteOrder(orderId));
            } else {
                res.status(400).send(idIsValid);
            }
        } catch (err) {
            next(err);
        }
    }

    async getOrderById(req, res, next) {
        try {
            let idToDelete = parseInt(req.params.id);
            if (isNaN(idToDelete)) {
                throw new Error(`The id must be integer`)
            } else {
                res.send(await OrdersRepository.getOrderById(idToDelete));
            }
        } catch (err) {
            next(err);
        }
    }

    async getTotalOrders(req, res, next) {
        try {
            const idIsValid = validateTotalOrders(req.body);
            if (idIsValid === true) {
                const clientName = req.body.cliente;
                res.send(await OrdersRepository.getTotalOrders(clientName));
            } else {
                res.status(400).send(idIsValid);
            }
        } catch (err) {
            next(err);
        }
    }
}

export default new OrderControler();