'use strict'
const Store = require('../model/store.class');
const View = require('../view/view.class');

class Controller{
    constructor(){
        this.store = new Store(1, "Store");
        this.view = new View();
    }

    init(){
        //loadData();
    }

    addProductToStore(payload){
        try{
            const product = this.store.addProduct(payload);
            this.view.pintarProducto(product);
            this.view.pintarTotalImport(this.store.totalImport())
        }catch(e){
            this.view.errorMessage(e);
        }
    }

    deleteProductFromStore(id){
        try{
            const del = this.store.delProduct(id);
            this.view.delPro(id);
        }catch(e){
            this.view.errorMessage(e);
        }
    }

    addCategoriaToStore(cat){
        try{
            const categoria = this.store.addCategory(cat.name, cat.description);
            this.view.rellenarSelect(categoria);
        }catch(e){
            this.view.errorMessage(e);
        }
    }

    deleteCategoriaFromStore(id){
        try{
            const del = this.store.delCategory(id);
            this.view.delCat(id);
        }catch(e){
            this.view.errorMessage(e);
        }
    }

}
module.exports = Controller;