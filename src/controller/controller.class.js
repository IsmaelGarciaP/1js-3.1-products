'use strict'
const Store = require('../model/store.class');
const View = require('../model/store.class');

class Controller{
    constructor(){
        this.store = new Store(1, "Store");
        this.view = new View();
    }

    init(){
        loadData();
    }

    addProductToStore(payload){
        try{
            const product = addProduct(payload);
            this.view.pintarProducto(product);
        }catch(e){
            alert.e;
        }

    }
}