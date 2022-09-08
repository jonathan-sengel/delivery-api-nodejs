import { Router } from "express"
import OrderController from "./controllers/orders.controller.js";

const router = Router();

router.get('/orders', OrderController.getOrders);
router.post('/newOrder', OrderController.newOrder);
router.put('/updateOrder', OrderController.updateOrder);
router.put('/updateStatus', OrderController.updateStatus);
router.get('/order/:id', OrderController.getOrderById);

router.use((err, req, res, next) => {
    res.status(400).send({ error: err.message });
})

export { router }