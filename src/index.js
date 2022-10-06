'use strict'

// Creamos un nuevo almacén con id 1
// Antes hemos haber importado la clase Store para poder usarla
const Store = require('./store.class');
const myStore = new Store(1, 'Almacén de ACME')
myStore.loadData();

console.log(myStore.categories)

console.log(myStore.products)
