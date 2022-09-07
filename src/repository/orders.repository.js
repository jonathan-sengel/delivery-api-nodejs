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

async function updateOrder(orderToUpdate) {
    let { nextId, pedidos } = await getOrders();
    let index = pedidos.findIndex(order => order.id === orderToUpdate.id);
    if (index !== -1) {
        pedidos[index] = {
            id: orderToUpdate.id,
            cliente: orderToUpdate.cliente,
            produto: orderToUpdate.produto,
            valor: orderToUpdate.valor,
            entregue: orderToUpdate.entregue,
            timestamp: new Date()
        }

        await fs.writeFile(global.jsonFile, JSON.stringify({ nextId, pedidos }));
        return pedidos[index];
    } else {
        throw new Error(`Data not found id:${orderToUpdate.id}`);
    }
}

export default {
    getOrders,
    newOrder,
    updateOrder
}