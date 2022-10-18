// Aquí la clase Product
class Product{
    constructor(id, name, category, price, units = 0){
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.units = units; 
    }

    productImport(){
        let total = this.price * this.units
        return total;
    }
    
    toString(){
        return this.name + ": "+ this.units + " uds. x " + this.price + " €/u = " + this.productImport() + " €";
    }

    addUnid(){
        this.units++;
    }

    delUnid(){
        this.units--;
    }
}
module.exports = Product

