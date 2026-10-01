const express = require('express');
const app = express();
const fs = require('fs/promises');
const path = require('path');
const port = 3000;

const filePath = path.join(__dirname, 'db.json');

let cache = {}

async function readData(){
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
}

async function delayReadData(){
    await new Promise((resolve, reject) => {
        setTimeout(resolve, 1500)
    })
    return await readData();
}

app.get('/products', async (req, res) => {

    let key = req.url;
    let value = cache[key];

    try {
        if (value) {
            return res.json(value);;
        }
        const products = await delayReadData();
        cache[key] = products;
        res.json(products);
    }catch (error) {
        console.log(error);
    }
});

app.get('/products/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const products = await delayReadData();
        let key = req.url;
        let value = cache[key];

        if (value) {
            return res.json(value);
        }

        const data = products.find((item) => item.id === id);
        cache[key] = data;
        res.json(data);
    } catch (error) {
        console.log(error);
    }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// "/products" => []
// "/products/1" => {}
// "/products/2" => {}