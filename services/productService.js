const {
    readData,
    writeData
} = require('../database/productDatabase');

async function getAllProducts() {
    return await readData();
}

async function getProductById(id) {
    const products = await readData();

    return products.find(
        product => product.id === Number(id)
    );
}

async function createProduct(productData) {
    const products = await readData();

    const newProduct = {
        id: products.length > 0
            ? products[products.length - 1].id + 1
            : 1,
        ...productData
    };

    products.push(newProduct);

    await writeData(products);

    return newProduct;
}

async function updateProduct(id, productData) {
    const products = await readData();

    const index = products.findIndex(
        product => product.id === Number(id)
    );

    if (index === -1) {
        return null;
    }

    products[index] = {
        ...productData,
        id: Number(id)
    };

    await writeData(products);

    return products[index];
}

async function patchProduct(id, productData) {
    const products = await readData();

    const index = products.findIndex(
        product => product.id === Number(id)
    );

    if (index === -1) {
        return null;
    }

    products[index] = {
        ...products[index],
        ...productData,
        id: Number(id)
    };

    await writeData(products);

    return products[index];
}

async function deleteProduct(id) {
    const products = await readData();

    const index = products.findIndex(
        product => product.id === Number(id)
    );

    if (index === -1) {
        return null;
    }

    const deletedProduct = products.splice(index, 1)[0];

    await writeData(products);

    return deletedProduct;
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
};