const express = require('express');
const router = express.Router();
const Product = require('../Models/Product');

// Create product
router.post('/', (req, res, next) => {
    const product = new Product(req.body);
    product.save().then(
        (result) => {
            res.json(result);
        }
    ).catch(error => next(error));
});

// READ product
router.get('/:id', (req, res, next) => {
    Product.findById(req.params.id).then(
        (product) => {
            res.json(product);
        }
    ).catch(error => next(error));
});

// Update product
router.put('/:id', (req, res, next) => {
    Product.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
        (result) => {
            res.json(result);
        }
    ).catch(error => next(error));
});

// Deleting a product
router.delete('/:id', (req, res, next) => {
    Product.findByIdAndDelete(req.params.id).then(
        (result) => {
            if (!result) {
                next(new Error(`Cannot find product with _id: ${req.params.id}`));
            } else {
                res.json(result);
            }
        }
    ).catch((error) => next(error));
});

module.exports = router;