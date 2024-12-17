const { PembelianReq } = require('./product.request')
const {Product} = require('./product.entity')
const ProductEntity = Product

class ProductServices {
    constructor(productRepo, transactionRepo, saldoRepo) {
        this.productRepo = productRepo
        this.transactionRepo = transactionRepo
        this.saldoRepo = saldoRepo
    }

    async execute() {
        try {
            const data = await this.productRepo.getAll()
            return data
        } catch (error) {
            throw error
        }
    }

    async insertProductServices(product) {
        try {

            return await this.productRepo.insertProduct(product)
        } catch (error) {
            throw error
        }
    }

    async createPurchase(request) {
        try {

            const pecahan = [2000, 5000, 10000, 20000, 50000]
            let validation = false
            request.purchase = parseFloat(request.purchase)

            pecahan.forEach(item => {
                if (request.pecahan == item) {
                    validation = true
                }
            })


            if (!validation) {
                return "pecahan uang tidak sesuai"
            }
            const product = await this.productRepo.GetOneProduct(request.idProduct)
            if(product.stock < request.quantity || product.stock == 0 ) {
                return "stock sudah habis"
            }

            product.price = parseFloat(product.price)
            let kembalian = 0
            if (request.purchase > product.price) {
                kembalian =  request.purchase - product.price                
            }
            const price = product.price * request.quantity
            if (request.purchase < price) {
                throw "uang tidak cukup"
            }
            const saldo = await this.saldoRepo.GetSaldo()
            request.total = price
            const createTrans = await this.transactionRepo.CreateTransaction(request)
            const updateSaldo = parseFloat(saldo.saldo) + parseFloat(price)
            await this.saldoRepo.UpdateSaldo(updateSaldo, saldo.id)

            const updateProduct = new ProductEntity(
                product.idProduct, 
                product.productName,
                product.description,
                product.image,
                product.price,
                product.stock - request.quantity,
            )       
            await this.productRepo.UpdateProduct(updateProduct)

            const response = new PembelianReq(
                createTrans.id,
                createTrans.time,
                request.idProduct,
                request.purchase,
                0,
                kembalian,
                request.quantity,
                product.price ,
                price,
            )

            return response
        } catch (error) {
            throw error
        }
    }

    async GetSaldoServices() {
        try {
            const saldo = await this.saldoRepo.GetSaldo()
            return saldo

        } catch (error) {
            throw error
        }
    }

    async GetAllTransactionServices() {
        try {
            const transc = await this.transactionRepo.GetAllTransaction()
            return transc
        } catch (error) {
            return error
        }
    }
}

module.exports = { ProductServices }
