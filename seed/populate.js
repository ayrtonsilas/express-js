'use strict';
const { readFileSync } = require('fs');
const { join } = require('path');
const axios = require('axios');

let migrated = [];
async function run() {
    try {
        const productsBuffer = readFileSync(join(__dirname, 'products.json'));
        const products = JSON.parse(productsBuffer.toString());
        const productsFiltred = products.filter(item => !migrated.includes(item.name));

        for (const product of productsFiltred) {
            migrated.push(product.name);
            await axios.post('http://localhost:3333/products', product)
                .catch(err => {
                    throw new Error(product.name);
                });

            console.log(`product: ${product.name} migrated`);
        }
    } catch (error) {
        console.log(`product: ${error} already migrated`);
        await run();
    }
}
run();