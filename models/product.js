const fs = require('fs');
const path = require('path');
const Cart = require('./cart')
const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);
const getProductsFromFile = cb => {
    //2. // console.log('getProductsFromFile DEF cb-> ', cb)
    fs.readFile(p, (err, fileContent) => {
        //  3. // console.log('getProductsFromFile fileContent-> ', fileContent)
        if (err) {
            return cb([]);
        } else {
            try {
                // console.log('getProductsFromFile try-> ', JSON.parse(fileContent))
                cb(JSON.parse(fileContent));
            } catch (err) {
                // console.log('getProductsFromFile catch-> ', err)
                cb([]);
            }
        }
    });

}


module.exports = class Product {
    constructor(id, title, imageUrl, price, description) {
        this.id = id; // initially null 
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    save() {
        getProductsFromFile(products => {
            if (this.id) {
                const existingProductIndex = products.findIndex(p => p.id === this.id);
                const updatedProduct = this;
                const productList = [...products];
                productList[existingProductIndex] = updatedProduct;
                fs.writeFile(p, JSON.stringify(productList), err => {});
            } else {
                this.id = (Math.floor(Math.random() * 10000000000)).toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), err => {});
            }
        });

    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

    static findById(id, cb) {
        // 1. // console.log('findById ->', id, 'CB-> ', cb);
        getProductsFromFile(product => {
            //     3. // console.log('getProductsFromFile Product ->', product);
            const prod = product.find(p => p.id === id);
            //     4. // console.log('getProductsFromFile prod ->', prod);
            cb(prod);
        });
    }

    static deleteProduct(id) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);

            const updatedProducts = products.filter(p => p.id !== id);

            fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                if (!err) {
                    Cart.deleteProduct(id, product.price)
                }
            })
        });
    }
};