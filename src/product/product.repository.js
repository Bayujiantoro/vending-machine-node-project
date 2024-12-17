const { PrismaClient } = require('@prisma/client');
const { Product, TransactionEntity, SaldoEntity } = require('./product.entity')


class ProductRepository {
    constructor() {
        this.prisma = new PrismaClient();
    }
    async getAll() {
        try {
            const data = await this.prisma.products.findMany();
            return data.map(item => {
                const product = new Product(
                    item.idProduct,
                    item.productName,
                    item.description,
                    item.image,
                    item.price,
                    item.stock,
                );
                return product;
            });
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    async insertProduct(product) {
        try {
            return await this.prisma.products.create({
                data: {
                    productName: product.productName,
                    description: product.description,
                    image: product.image,
                    price: product.price,
                    stock: product.stock,
                }
            })

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async GetOneProduct(id) {
        try {
            const data = await this.prisma.products.findFirst({
                where: {
                    idProduct: id,
                },
            });
            const product = new Product(
                data.idProduct,
                data.productName,
                data.description,
                data.image,
                data.price,
                data.stock,
            );
            return product;

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async UpdateProduct(product) {
        try {
            const data = await this.prisma.products.update({
                where: {
                    idProduct: product.idProduct
                },
                data: {
                    productName: product.productName,
                    description: product.description,
                    image: product.image,
                    price: product.price,
                    stock: product.stock,
                }
            })
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

class TransactionRepository {
    constructor() {
        this.prisma = new PrismaClient();
    }

    async CreateTransaction(module) {
        try {
            return await this.prisma.transaction.create({
                data: {
                    idProduct: module.idProduct,
                    purchase: module.total,
                    time: module.time,
                    quantity: module.quantity,
                }

            })
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async GetAllTransaction() {
        try {
            const data = await this.prisma.transaction.findMany();
            return data.map(item => {

                const Trans = new TransactionEntity(
                    item.id,
                    item.time,
                    item.idProduct,
                    item.purchase,
                    item.quantity,
                );

                return Trans;
            });
        } catch (error) {

        }
    }


}

class SaldoRepository {
    constructor() {
        this.prisma = new PrismaClient();
    }

    async CreateSaldo(saldo) {
        try {
            return await this.prisma.saldo.create({
                data: {
                    saldo: saldo
                }

            })
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async UpdateSaldo(saldo, id) {
        try {
            return await this.prisma.saldo.update({
                where: {
                    idSaldo: id,
                },
                data: {
                    saldo: saldo
                }
            })
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async GetSaldo() {
        try {
            const data = await this.prisma.saldo.findFirst()
            const result = new SaldoEntity(
                data.idSaldo,
                data.saldo
            );
            return result

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

}


module.exports = { ProductRepository, TransactionRepository, SaldoRepository }