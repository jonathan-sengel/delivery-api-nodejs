import { Router } from "express"
import OrderController from "./controllers/orders.controller.js";

const router = Router();

router.get('/orders', OrderController.getOrders);
router.post('/newOrder', OrderController.newOrder);
router.put('/updateOrder', OrderController.updateOrder);
router.put('/updateStatus', OrderController.updateStatus);
router.delete('/deleteOrder', OrderController.deleteOrder);
router.get('/order/:id', OrderController.getOrderById);
router.get('/totalOrdersByClient', OrderController.getTotalOrdersByClient);
router.get('/totalOrdersByProduct', OrderController.getTotalOrdersByProduct);

router.use((err, req, res, next) => {
    res.status(400).send({ error: err.message });
})

export { router }