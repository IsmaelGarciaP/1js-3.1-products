'use strict'

// Aquí importaremos la clase del controlador e instanciaremos uno
const Controller = require('./controller/controller.class')

const myController = new Controller()
myController.init()

// A continuación crearemos una función manejadora para cada formulario
window.addEventListener('load', () => {
  const error = document.getElementById('messages').value;

  // función manejadora del formulario 'new-prod'
  document.getElementById('new-prod').addEventListener('submit', (event) => {
    event.preventDefault()
    console.log("hola");

    // Aquí el código para obtener los datos del formulario
    const name = document.getElementById('newprod-name').value
    const desc = document.getElementById('newprod-cat').value
    const units = document.getElementById('newprod-units').value
    const price = document.getElementById('newprod-price').value 
    // ...
    
    // Aquí llamamos a la función del controlador que añade productos (addProductToStore)
    // pasándole como parámetro esos datos
    myController.addProductToStore({ name, desc, units, price })   
    // Sintaxis de ES2015 que equivale a 
    //
    // myController.addProductToStore(
    //   { 
    //     name: name,
    //     price: price 
    //   }
    // ) 
  })

  document.getElementById('new-cat').addEventListener('submit', (event) => {
event.preventDefault();

const name = document.getElementById('newcat-name').value;
const desc = document.getElementById('newcar-desc').value;

myController.add
  });

  document.getElementById('del-prod').addEventListener('submit', (event) => {
    event.preventDefault()

    myController.deleteProductFromStore(document.getElementById('delprod-id').value)      
  })

})
