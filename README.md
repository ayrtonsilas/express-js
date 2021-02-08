# Projeto Controle de Produtos e Pedidos

## Funcionalidades
 - Cadastrar e atualizar e visualizar produtos
 - Cadastrar e visualizar pedidos

## Tecnologias
 - TypeScript 
 - NodeJs
 - ExpressJs
 - Jest
 - RabbitMQ
 - Docker
 - Mongoose

## Como instalar

Instalar as dependências
```bash
$ yarn install
```

## Running the app with docker
Run docker by docker-compose
```bash
$ docker-compose up --build -d
```

## URL
```
http://localhost:3333
```
Esperado:
`Health check`

## Popular o banco
Depois que a aplicação estiver rodando, você pode popular os produtos com o seguinte comando:
```bash
$ yarn seed
```

## Testes

```bash
$ yarn test
```

```
 PASS  src/modules/orders/test/order.service.spec.ts (5.004 s)
  Test order
    ✓ create order (29 ms)
    ✓ find order (10 ms)

 PASS  src/modules/products/test/product.service.spec.ts
  Test product
    ✓ create product (9 ms)
    ✓ find product (3 ms)

Test Suites: 2 passed, 2 total
Tests:       4 passed, 4 total
Snapshots:   0 total
```
## Rotas
```
[GET] /products
```
Response
```
{
    "products": [
        {
            "price": 1,
            "quantity": 1,
            "_id": "602084285316e000b69b8bf1",
            "name": "Pigeon pea"
        },
        {
            "price": 1,
            "quantity": 1,
            "_id": "6020842a5316e000b69b8bf2",
            "name": "Coriander"
        }
    ]
}
```

------------

```
[GET] /products/:name
```
Response
```
{
    "price": 9.84,
    "quantity": 1,
    "_id": "602084872be7d600c11967ac",
    "name": "Peanut"
}
```

------------

```
[GET] /orders
```
Response
```
{
    "orders": [
        {
            "_id": "60209188ddad72015bff10dc",
            "products": [
                {
                    "name": "Kiwi",
                    "quantity": 1
                },
                {
                    "name": "Peanut",
                    "quantity": 3
                }
            ],
            "total": 10
        },
        {
            "_id": "6020940060b9b60171cd774f",
            "products": [
                {
                    "name": "Kiwi",
                    "quantity": 1
                },
                {
                    "name": "Peanut",
                    "quantity": 3
                }
            ],
            "total": 10
        }
    ]
}
```

------------

```
[GET] /orders/:id
```
Response
```
{
    "_id": "6020940060b9b60171cd774f",
    "products": [
        {
            "name": "Kiwi",
            "quantity": 1
        },
        {
            "name": "Peanut",
            "quantity": 3
        }
    ],
    "total": 4
}
```

------------

```
[POST] /orders
```
Body
```
{
  "products": [
    {
      "name": "Pepper",
      "quantity": 1
    },
    {
      "name": "Peanut",
      "quantity": 2
    }
  ]
}
```
Response
```
{
    "_id": "6020af798a8db402004f467e",
    "products": [
        {
            "name": "Pepper",
            "quantity": 1
        },
        {
            "name": "Peanut",
            "quantity": 2
        }
    ],
    "total": 16.6
}
```
