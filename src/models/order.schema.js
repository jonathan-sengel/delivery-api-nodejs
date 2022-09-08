import Ajv from 'ajv';
const ajv = new Ajv();


const newOrderSchema = {
    type: 'object',
    properties: {
        cliente: { type: 'string' },
        produto: { type: 'string' },
        valor: { type: 'number' },
    },
    required: ['cliente', 'produto', 'valor'],
    additionalProperties: false
};

export function validateNewOrder(order) {
    let validate = ajv.compile(newOrderSchema);
    const isValid = validate(order);
    if (!isValid) {
        const error = validate.errors[0];
        if (error.keyword === 'type') {
            return { field: error.instancePath.replace('/', ''), message: error.message }
        }
        if (error.keyword === 'additionalProperties') {
            return { field: error.params.additionalProperty, message: error.message }
        }
        else {
            const msg = error.message.split("'");
            return { field: msg[1], message: msg[0].replace('property', '').trimEnd() }
        }
    } return true;
}

const updateOrderSchema = {
    type: 'object',
    properties: {
        id: { type: 'integer' },
        cliente: { type: 'string' },
        produto: { type: 'string' },
        valor: { type: 'number' },
        entregue: { type: 'boolean' }
    },
    required: ['id'],
    additionalProperties: false
}

export function validateOrderUpdate(orderToUpdate) {
    let validate = ajv.compile(updateOrderSchema);
    const isValid = validate(orderToUpdate);
    if (!isValid) {
        const error = validate.errors[0];
        if (error.keyword === 'type') {
            return { field: error.instancePath.replace('/', ''), message: error.message }
        }
        if (error.keyword === 'additionalProperties') {
            return { field: error.params.additionalProperty, message: error.message }
        }
        else {
            const msg = error.message.split("'");
            return { field: msg[1], message: msg[0].replace('property', '').trimEnd() }
        }
    } return true;
}

const updateStatusSchema = {
    type: 'object',
    properties: {
        id: { type: 'integer' },
        entregue: { type: 'boolean' }
    },
    required: ['id', 'entregue'],
    additionalProperties: false
}


export function validateUpdateStatus(orderToUpdate) {
    let validate = ajv.compile(updateStatusSchema);
    const isvalid = validate(orderToUpdate);
    if (!isvalid) {
        const error = validate.errors[0];
        if (error.keyword === 'type') {
            return { field: error.instancePath.replace('/', ''), message: error.message }
        }
        if (error.keyword === 'additionalProperties') {
            return { field: error.params.additionalProperty, message: error.message }
        }
        else {
            const msg = error.message.split("'");
            return { field: msg[1], message: msg[0].replace('property', '').trimEnd() }
        }
    } return true;
}


const deleteOrderSchema = {
    type: 'object',
    properties: {
        id: { type: 'integer' }
    },
    required: ['id'],
    additionalProperties: false
}

export function validateDeleteOrder(orderId) {
    let validate = ajv.compile(deleteOrderSchema);
    const isvalid = validate(orderId);
    if (!isvalid) {
        const error = validate.errors[0];
        if (error.keyword === 'type') {
            return { field: error.instancePath.replace('/', ''), message: error.message }
        }
        if (error.keyword === 'additionalProperties') {
            return { field: error.params.additionalProperty, message: error.message }
        }
        else {
            const msg = error.message.split("'");
            return { field: msg[1], message: msg[0].replace('property', '').trimEnd() }
        }
    } return true;
}


const getTotalOrders = {
    type: 'object',
    properties: {
        cliente: { type: 'string' }
    },
    required: ['cliente'],
    additionalProperties: false
}

export function validateTotalOrders(cliente) {
    let validate = ajv.compile(getTotalOrders);
    const isvalid = validate(cliente);
    if (!isvalid) {
        const error = validate.errors[0];
        if (error.keyword === 'type') {
            return { field: error.instancePath.replace('/', ''), message: error.message }
        }
        if (error.keyword === 'additionalProperties') {
            return { field: error.params.additionalProperty, message: error.message }
        }
        else {
            const msg = error.message.split("'");
            return { field: msg[1], message: msg[0].replace('property', '').trimEnd() }
        }
    } return true;
}