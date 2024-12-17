// const express = require('express')
// const router = express.Router();
const { ProductServices } = require('./product.services');
const {Product} = require('./product.entity')
const {PembelianReq} = require('./product.request');
const { response } = require('express');

class ProductController {
    constructor(produkRepo , transRepo ,saldoRepo) {
        this.productServices = new ProductServices(produkRepo , transRepo ,saldoRepo)
    }

    async getAllProducts(req, res) {
        try {
            const product = await this.productServices.execute();
            console.log("product   >>>  ", product)
            res.status(200).json({
                data: product
            })

        } catch (error) {
            res.status(400).json({
                message: error
            })
        }
    }

    async insertProductController(req, res) {
        try {

            
            const request = req.body;

            const module = new Product(
                request.idProduct,
                request.productName,
                request.description,
                request.image,
                request.price,
                request.stock,
            );

            const resData = await this.productServices.insertProductServices(module)
            res.status(200).json({

                data: resData
            })

        } catch (error) {
            console.log(error);
            res.status(400).json({

                message: error
            })
        }
    }

    async getAllTransactionController(req,res) {
        try {
            const response = await this.productServices.GetAllTransactionServices()
            res.status(200).json({
                data: response
            })
        } catch (error) {
            res.status(400).json({

                message: error
            }) 
        }
    }

    async createTransaction(req, res) {
        try {

            const request = req.body;

            const module = new PembelianReq(
                request.id,
                new Date(Date.now()),
                request.idProduct,
                request.purchase,
                request.pecahan,
                request.kembalian, 
                request.quantity,
            );
            console.log(module);
            

            const response = await this.productServices.createPurchase(module)
            res.status(200).json({
                data: response
            })

            
        } catch (error) {
            console.log(error);
            res.status(400).json({

                message: error
            })
        }
    }

    async GetSaldoController(req, res) {
        try {
            const response = await this.productServices.GetSaldoServices()
            res.status(200).json({
                data: response
            })
        } catch (error) {
            console.log(error);
            res.status(400).json({

                message: error
            })
        }
    }
}

module.exports = ProductController
