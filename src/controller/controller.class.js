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
        this.setListeners();
    }

    addProductToStore(payload){
        try{
            const product = this.store.addProduct(payload);
            this.view.pintarProducto(product, this.deleteProductFromStore.bind(this), this.store.totalImport.bind(this.store));
            this.view.pintarTotalImport(this.store.totalImport())
        }catch(e){
            setTimeout(this.view.errorMessage(e), 2);
        }
    }

    modificarProducto(payload){
        try{
            const product = this.store.modificarProduct(payload);
            this.view.modificarTabla(product,);
            this.view.pintarTotalImport(this.store.totalImport())
        }catch(e){
            setTimeout(this.view.errorMessage(e), 2);
        }
    }

    deleteProductFromStore(id){
        try{
            const del = this.store.delProduct(id);
            this.view.delPro(id);
        }catch(e){
            setTimeout(this.view.errorMessage(e), 2);
        }
    }

    addCategoriaToStore(cat){
        try{
            const categoria = this.store.addCategory(cat.name, cat.description);
            this.view.rellenarSelect(categoria);
        }catch(e){
            setTimeout(this.view.errorMessage(e), 2000);
        }
    }

    deleteCategoriaFromStore(id){
        try{
            const del = this.store.delCategory(id);
            this.view.delCat(id);
        }catch(e){
            setTimeout(this.view.errorMessage(e), 2);
        }
    }

    compNombrePro(name,prodName){
        try{
            this.store.getProductByName(name);
            prodName.setCustomValidity("Nombre repetido");
        }catch{
            prodName.nextElementSibling.textContent = prodName.validationMessage;
            prodName.setCustomValidity("");
        }
        prodName.nextElementSibling.textContent = prodName.validationMessage;
    }

    setListeners(){
        const prodName = document.getElementById("newprod-name");
        prodName.addEventListener("blur", () => this.compNombrePro(prodName.value,prodName));

        const select = document.getElementById("select");
        select.addEventListener("blur", () => select.nextElementSibling.textContent = select.validationMessage);

        const units = document.getElementById("newprod-units");
        units.addEventListener("blur", () => units.nextElementSibling.textContent = units.validationMessage);

        const price = document.getElementById("newprod-price");
        price.addEventListener("blur", () => price.nextElementSibling.textContent = price.validationMessage);

        document.getElementById('new-prod').addEventListener('submit', (event) => {
            this.compNombrePro(prodName.value,prodName);
            select.nextElementSibling.textContent = select.validationMessage
            units.nextElementSibling.textContent = units.validationMessage
            price.nextElementSibling.textContent = price.validationMessage
            
        })
    }

}
module.exports = Controller;