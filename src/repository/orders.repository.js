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
        throw new Error(`Order of id '${orderToUpdate.id}' not found.`);
    }
}

async function updateOrderStatus(orderToUpdate) {
    let { nextId, pedidos } = await getOrders();
    let index = pedidos.findIndex(order => order.id === orderToUpdate.id);
    if (index !== -1) {
        pedidos[index].entregue = orderToUpdate.entregue;
        pedidos[index].timestamp = new Date();
        await fs.writeFile(global.jsonFile, JSON.stringify({ nextId, pedidos }));
        return pedidos[index];
    } else {
        throw new Error(`Order of id '${orderToUpdate.id}' not found.`)
    }
}

async function deleteOrder(orderId) {
    let { nextId, pedidos } = await getOrders();
    let index = pedidos.findIndex(order => order.id === orderId);
    if (index !== -1) {
        pedidos.splice(index, 1);
        await fs.writeFile(global.jsonFile, JSON.stringify({ nextId, pedidos }));
        return { message: 'delete ok' }
    } else {
        throw new Error(`Order of id '${orderId}' not found.`)
    }
}

async function getOrderById(id) {
    const orders = await getOrders();
    let index = orders.pedidos.findIndex(pedido => pedido.id == id);
    if (index === -1) {
        throw new Error(`Order of id '${id}' was not found.`);
    } else {
        return orders.pedidos[index];
    }
}

async function getTotalOrders(cliente) {
    const { pedidos } = await getOrders();
    const pedidosCliente = pedidos.filter(pedido => {
        if (pedido.cliente) {
            return pedido.cliente.toUpperCase() === cliente.toUpperCase();
        }
    });

    if (pedidosCliente.length < 1) {
        throw new Error(`Customer '${cliente}' has no orders.`);
    }

    const pedidosReduced = pedidosCliente.reduce((acc, pedido) => {
        if (pedido.entregue) {
            return acc + pedido.valor
        }
        else {
            return acc;
        }
    }, 0);

    return { valorTotal: pedidosReduced };
}

export default {
    getOrders,
    newOrder,
    updateOrder,
    updateOrderStatus,
    deleteOrder,
    getOrderById,
    getTotalOrders
}