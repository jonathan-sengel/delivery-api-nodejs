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

async function getTotalOrdersByClient(cliente) {
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

async function getTotalOrdersByProduct(produto) {
    const { pedidos } = await getOrders();
    const pedidosProduto = pedidos.filter(pedido => {
        if (pedido.produto) {
            return pedido.produto.toUpperCase() === produto.toUpperCase();
        }
    });
    if (pedidosProduto.length < 1) {
        throw new Error(`Customer '${produto}' has no orders.`);
    }
    const pedidosReduced = pedidosProduto.reduce((acc, pedido) => {
        if (pedido.entregue) {
            return acc + pedido.valor
        }
        else {
            return acc;
        }
    }, 0);
    return { valorTotal: pedidosReduced };
}

async function getTopProducts() {
    const { pedidos } = await getOrders();
    let ranking = groupBy(pedidos, 'produto');
    let arrObj = Object.entries(ranking);
    arrObj.map(item => {
        return { ...item }
    });
    arrObj.sort((a, b) => {
        return b[1].qtd - a[1].qtd;
    });
    return arrObj.reduce((acc, item) => {

        acc.push(`${item[0]} - ${item[1].qtd}`)
        return acc;
    }, []);

}



function groupBy(array, prop) {
    return array.reduce((acc, obj) => {
        let key = obj[prop];
        if (!acc[key]) {
            acc[key] = {
                qtd: 0,
                total: 0,
                // ordersId: []
            };
        }

        if (obj.entregue) {
            acc[key].qtd += 1;
            acc[key].total += obj.valor;
        }
        // acc[key].ordersId.push(obj.id);
        return acc;
    }, {});
}

export default {
    getOrders,
    newOrder,
    updateOrder,
    updateOrderStatus,
    deleteOrder,
    getOrderById,
    getTotalOrdersByClient,
    getTotalOrdersByProduct,
    getTopProducts
}