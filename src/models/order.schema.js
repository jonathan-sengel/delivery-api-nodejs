import Ajv from 'ajv';
const ajv = new Ajv();


const newOrderSchema = {
    type: 'object',
    properties: {
        id: { type: 'integer' },
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
        } else {
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
        } else {
            const msg = error.message.split("'");
            return { field: msg[1], message: msg[0].replace('property', '').trimEnd() }
        }
    } return true;

}
