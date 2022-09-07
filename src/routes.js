import { Router } from "express"
import OrderControler from "./controllers/orders.controller.js";

const router = Router();

router.get('/orders', OrderControler.getOrders);
router.post('/newOrder', OrderControler.newOrder);

export { router }