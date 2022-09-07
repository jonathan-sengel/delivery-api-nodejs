import { Router } from "express"
import OrderController from "./controllers/orders.controller.js";

const router = Router();

router.get('/orders', OrderController.getOrders);
router.post('/newOrder', OrderController.newOrder);
router.put('/updateOrder', OrderController.updateOrder);

export { router }