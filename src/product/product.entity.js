class Product {
    constructor(idProduct, productName, description, image, price, stock) {
        this.idProduct = idProduct ;
        this.productName = productName ;
        this.description = description ;
        this.image = image ;
        this.price = price ;
        this.stock = stock;
    }
}

class TransactionEntity {
    constructor(id ,time , idProduct , purchase , quantity, price) {
        this.id = id;
        this.time = time;
        this.idProduct = idProduct;
        this.purchase = purchase;
        this.quantity = quantity,
        this.price = price
    }

}

class SaldoEntity {
    constructor(idSaldo , saldo) {
        this.id = idSaldo;
        this.saldo = saldo
    }
}

module.exports = {Product , TransactionEntity ,SaldoEntity}