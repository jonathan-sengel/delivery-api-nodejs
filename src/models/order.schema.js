import Ajv from 'ajv';
const ajv = new Ajv();


const orderSchema = {
    type: 'object',
    properties: {
        id: { type: 'integer' },
        cliente: { type: 'string' },
        produto: { type: 'string' },
        valor: { type: 'number' },
        entregue: { type: 'boolean' },
        timestamp: { type: 'string' }
    },
    required: ['cliente', 'produto', 'valor'],
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