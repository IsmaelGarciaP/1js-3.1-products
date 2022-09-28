const Category = require('./category.class');
const Product = require('./product.class');

// Aquí la clase Store
class Store{
    constructor(id, name){
        this.id = id;
        this.name = name;
        this.products = [];
        this.categories = [];
    }
    getCategoryById(id){
        let cat = this.categories.find(element => element.id == id);
        if(!cat){
            throw "No existe categoria";
        }
        return cat;
    }
    getCategoryByName(name){
        let cat = this.categories.find(element => element.name.toLowerCase() == name.toLowerCase());
        if(cat == null){
            throw "No existe categoria";
        }
        return cat;
    }

    getProductById(id){
        let pro = this.products.find(element => element.id == id);
        if(pro == null){
            throw "No existe products";
        }
        return pro;
    }

    getProductsByCategory(id){
        let pro = this.products.filter(element => element.category == id);
        return pro;
    }

    addCategory(nombre, description){
        if(!nombre){
            throw "No se puede añadir";
        }
        try{
            this.getCategoryByName(nombre);
        }catch {
            let maxid = this.categories.reduce((max, categoria) => categoria.id > max ? max = categoria.id : max,0);
            let cat = new Category(maxid+1, nombre, description);
            this.categories.push(cat);
            return cat;
        }
        throw "No se puede añadir";
    }

    addProduct(payload){
        if(payload.name == ""){
            throw "No se puede añadir";
        }
        if(!this.getCategoryById(payload.category)){
            throw "No se puede añadir";
        }
        if(!payload.price || payload.price <= 0){
            throw "No se puede añadir";
        }
        if(payload.price && isNaN(payload.price)){
            throw "No se puede añadir";
        }
        if(payload.units && isNaN(payload.units)){
            throw "No se puede añadir";
        }
        if(payload.units < 0){
            throw "No se puede añadir";
        }
        if(payload.units && !Number.isInteger(payload.units)){
            throw "No se puede añadir";
        }
        let maxid = this.products.reduce((max, id) => id.id > max ? max = id.id : max, 0);
        let prod = new Product((maxid+1), payload.name, payload.category, payload.price, payload.units);
        this.products.push(prod);
        return prod;
    }

    delCategory(id){
        this.getCategoryById(id);
        let index = this.categories.findIndex(element => element.id == id);

        if(this.getProductsByCategory(id).length){
            throw "No se puede borrar";
        }
        let array = this.categories.splice(index, 1);
        return array[0];
    }

    delProduct(id){
        let pro = this.getProductById(id);
        if(pro.units > 0){
            throw "No se puede borrar";
        }
        let index = this.products.findIndex(element => element.id == id);
        let array = this.products.splice(index, 1);
        return array[0];
    }

    totalImport(){
        let i = 0;
        this.products.forEach(element => {
            i =+ element.totalImport;
        });
        return i;
    }

    orderByUnitsDesc(){
        return this.products.sort((pro1, pro2) => pro2.units-pro1.units);
    }

    orderByName(){
        return this.products.sort((pro1, pro2) => pro1.name.localeCompare(pro2.name));
    }

    underStock(units){
        return this.products.filter( pro => pro.units < units);
    }

    toString(){
        return "";
    }
}
module.exports = Store

