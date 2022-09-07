import { validateOrder } from "../models/order.schema.js";

class OrderControler {
    getOrders(req, res, next) {
        res.send({ message: 'get ok' });
    }

    newOrder(req, res, next) {
        const orderIsValid = validateOrder(req.body)
        if (orderIsValid === true) {
            res.send({ message: 'ok' })
        } else {
            res.status(400).send(orderIsValid);
        }
    }
}

export default new OrderControler();