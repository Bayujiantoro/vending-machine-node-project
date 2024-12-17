class ProductReq {
    constructor( idProduct, price, quantity) {
        this.idProduct = idProduct;
        this.price = price;
        this.quantity = quantity;
    }
}

class PembelianReq {
    constructor(id ,time , idProduct , purchase, pecahan , kembalian , quantity , price , total) {
        this.id = id;
        this.time = time;
        this.idProduct = idProduct;
        this.purchase = purchase;
        this.pecahan = pecahan;
        this.kembalian = kembalian; 
        this.quantity = quantity;
        this.price = price
        this.total = total
    }
}

module.exports = {ProductReq, PembelianReq}