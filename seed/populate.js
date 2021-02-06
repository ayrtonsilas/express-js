'use strict';
const { readFileSync } = require('fs');
const { join } = require('path');
const axios = require('axios');

async function run() {
    try {
        const productsBuffer = readFileSync(join(__dirname, 'products.json'));
        const products = JSON.parse(productsBuffer.toString());
        for (const product of products) {
            await axios.post('http://localhost:3333/products', product);
        }
    } catch (error) {
        console.log(error.message);
    }
}
run();