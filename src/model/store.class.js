const Category = require('./category.class');
const Product = require('./product.class');
const initdata = require('./datosIni.json');
const Promesas = require('../model/promesas');

const SERVER = 'http://localhost:3000'
// Aquí la clase Store
class Store{
    constructor(id, name){
        this.id = id;
        this.name = name;
        this.products = [];
        this.categories = [];
    }
    
    async loadData(){
        const response = await fetch(SERVER + '/categories')
        let cat = await response.json();
        cat.forEach((item) => this.categories.push(new Category(item.id, item.name, item.description)))

        const responsePro = await fetch(SERVER + '/products')
        let pro = await responsePro.json();
        pro.forEach((item) => this.products.push(
            new Product(item.id, item.name, item.category, item.price, item.units)
        ))
        
        /*initdata.categories.forEach((catgoriData)=>{
            this.categories.push(new Category(categoriData.id, categoriData.name, catgoriData.description));
        });   
        initdata.products.forEach((productData) => {
            this.products.push(productData.id, productData.name, productData.description, productData.price, productData.units);
        });*/
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

    getProductByName(name){
        let pro = this.products.find(element => element.name.toLowerCase() == name.toLowerCase());
        if(pro == null){
            throw "No existe categoria";
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

    async addProduct(payload){
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
        if(payload.units < 0){1
            throw "No se puede añadir";
        }
        if(payload.units && !Number.isInteger(payload.units)){
            throw "No se puede añadir";
        }
        const response = await Promesas.addProductoBD(payload)

            //let maxid = this.products.reduce((max, id) => id.id > max ? max = id.id : max, 0);
            let prod = new Product(response.id, response.name, response.category, parseInt(response.price), response.units);
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

    async delProduct(id){
        let pro = this.getProductById(id);
        if(pro.units > 0){
            throw "No se puede borrar";
        }
        await Promesas.deleteProduct(id)
        .then(() => {
            let index = this.products.findIndex(element => element.id == id);
            let array = this.products.splice(index, 1);
            return array[0];
        })
        .catch((error) => {throw error});
    }

    totalImport(){
        let total = this.products.reduce((total,pro)  => total = total + parseInt(pro.productImport()), 0)
        return total;
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

    async modificarProduct(product){
        const prod = await Promesas.actualizar(product)
        let index = this.products.findIndex(pro => pro.id == product.id);
        this.products[index] = new Product(product.id, product.name, product.category, product.price, product.units);
        return this.products[index];
    }

    toString(){
        return "";
    }
}
module.exports = Store

