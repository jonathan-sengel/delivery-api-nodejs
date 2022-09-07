import Ajv from 'ajv';
const ajv = new Ajv();


const orderSchema = {
    type: 'object',
    properties: {
        id: { type: 'integer' },
        client: { type: 'string' },
        product: { type: 'string' },
        price: { type: 'number' },
        delivered: { type: 'boolean' },
        timestamp: { type: 'string' }
    },
    required: ['client', 'product', 'price'],
    additionalProperties: false
};

const validate = ajv.compile(orderSchema);

export function validateOrder(order) {
    const isValid = validate(order);
    if (!isValid) {
        const error = validate.errors[0];
        if (error.keyword === 'type') {
            return { error: { field: error.instancePath.replace('/', ''), message: error.message } }
        } else {
            const msg = error.message.split("'");
            return { field: msg[1], message: msg[0].replace('property', '').trimEnd() }
        }
    } return true;
}