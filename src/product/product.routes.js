const express = require('express');
const {ProductRepository , SaldoRepository , TransactionRepository} = require('./product.repository')
const ProductController = require('./product.controller');

const router = express.Router();
const productRepo = new ProductRepository();
const transRepo = new TransactionRepository();
const saldoRepo = new SaldoRepository();
const controller = new ProductController(productRepo , transRepo ,saldoRepo );
router.get('/product' , (req, res) => controller.getAllProducts(req, res))
router.post('/product/insert', (req,res) => controller.insertProductController(req,res))
router.post('/transaction',(req,res) => controller.createTransaction(req,res) )
router.get('/saldo', (req,res) => controller.GetSaldoController(req,res))
router.get('/transaction/all',  (req,res) => controller.getAllTransactionController(req,res))

module.exports = router