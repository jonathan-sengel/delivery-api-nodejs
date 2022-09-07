import { promises as fs } from 'fs';

async function getOrders() {
    const orders = JSON.parse(await fs.readFile(global.jsonFile));
    return orders;
}

async function newOrder(preOrder) {
    let { nextId, pedidos } = await getOrders();
    const order = {
        id: nextId++,
        ...preOrder,
        entregue: false,
        timestamp: new Date()
    }
    pedidos.push(order);
    await fs.writeFile(global.jsonFile, JSON.stringify({ nextId, pedidos }));
    return order;
}

export default {
    getOrders,
    newOrder
}