'use strict'

// Aquí importaremos la clase del controlador e instanciaremos uno
const Controller = require('./controller/controller.class')

const myController = new Controller()
myController.init()

// A continuación crearemos una función manejadora para cada formulario
window.addEventListener('load', () => {


  // función manejadora del formulario 'new-prod'
  document.getElementById('new-prod').addEventListener('submit', (event) => {
    event.preventDefault()

    // Aquí el código para obtener los datos del formulario
    const id = document.getElementById("id-pro").value;
    const name = document.getElementById('newprod-name').value
    const category = parseInt(document.getElementById('select').value);
    const units = parseInt(document.getElementById('newprod-units').value);
    const price = document.getElementById('newprod-price').value 
  
    if(!id){
      myController.addProductToStore({ name, category, units, price }) 
      document.getElementById('titulo').innerText = "Listado de productos";
      document.getElementById('div-new-prod').classList.add('ocultar');
      document.getElementById('div-new-cat').classList.add('ocultar');
      document.getElementById('div-del-cat').classList.add('ocultar');
      document.getElementById('div-tabla').classList.remove('ocultar');
      document.getElementById('div-sobre').classList.add('ocultar');
    }else{
      document.getElementById("id-pro").value = "";
      document.getElementById('newprod-name').value = "";
      document.getElementById('select').value  = "";
      document.getElementById('newprod-units').value = "";
      document.getElementById('newprod-price').value = ""; 
      myController.modificarProducto({id, name, category, units, price});
      document.getElementById("add-prduct").innerText = "Añadir";
      document.getElementById('div-new-prod').classList.add('ocultar');
    }
  })

  document.getElementById('new-cat').addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('newcat-name').value;
    const description = document.getElementById('newcat-desc').value;

    myController.addCategoriaToStore({name, description});
  });

  document.getElementById('del-cat').addEventListener('submit', (event) => {
    event.preventDefault()

    myController.deleteCategoriaFromStore(document.getElementById('delcat-id').value)   
    
  })

  document.getElementById('form-add-pro').addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('titulo').innerText = "Añadir Producto";
    document.getElementById('div-new-prod').classList.remove('ocultar');
    document.getElementById('div-new-cat').classList.add('ocultar');
    document.getElementById('div-del-cat').classList.add('ocultar');
    document.getElementById('div-tabla').classList.add('ocultar');
    document.getElementById('div-sobre').classList.add('ocultar');
  });

  document.getElementById('tab-cat').addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('titulo').innerText = "Listado de categorias";
    document.getElementById('div-new-prod').classList.add('ocultar');
    document.getElementById('div-new-cat').classList.add('ocultar');
    document.getElementById('div-del-cat').classList.add('ocultar');
    document.getElementById('div-tabla').classList.add('ocultar');
    document.getElementById('div-sobre').classList.add('ocultar');
  });

  document.getElementById('form-add-cat').addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('titulo').innerText = "Añadir Categoria";
    document.getElementById('div-new-prod').classList.add('ocultar');
    document.getElementById('div-new-cat').classList.remove('ocultar');
    document.getElementById('div-del-cat').classList.add('ocultar');
    document.getElementById('div-tabla').classList.add('ocultar');
    document.getElementById('div-sobre').classList.add('ocultar');
  });

  document.getElementById('sobre').addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('titulo').innerText = "Sobre";
    document.getElementById('div-new-prod').classList.add('ocultar');
    document.getElementById('div-new-cat').classList.add('ocultar');
    document.getElementById('div-del-cat').classList.add('ocultar');
    document.getElementById('div-tabla').classList.add('ocultar');
    document.getElementById('div-sobre').classList.remove('ocultar');
  });

    
  document.getElementById('product-tabla').addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('titulo').innerText = "Listado de productos";
    document.getElementById('div-new-prod').classList.add('ocultar');
    document.getElementById('div-new-cat').classList.add('ocultar');
    document.getElementById('div-del-cat').classList.add('ocultar');
    document.getElementById('div-tabla').classList.remove('ocultar');
    document.getElementById('div-sobre').classList.add('ocultar');
  });

})
