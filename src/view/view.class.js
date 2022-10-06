'use strict'
const Product = require('../model/product.class');
class View {
    constructor(){
        
    }

    pintarProducto(producto){
        let table =document.getElementById("cuerpoTabla");
        let tr = document.createElement('tr');
        tr.id="tr"+producto.id;
        tr.innerHTML = `                            <td>${producto.id}</td>
        <td>${producto.name}</td>
        <td>${producto.category}</td>
        <td>${producto.units}</td>
        <td>${producto.price}€/u</td>
        <td>${producto.productImport()} €</td>
        <td></td>`
        table.appendChild(tr);
    }

    rellenarSelect(cat){
        let select = document.getElementById("select");
        let option = document.createElement('option');
        option.id = cat.id;
        //option.innerHTML = `<option value="${cat.id}">${cat.name}</option>`
        option.setAttribute("value",cat.id)
        let optionTxt = document.createTextNode(cat.name);
        option.appendChild(optionTxt);
        select.appendChild(option);
    }

    delPro(id){
        let table = document.getElementById("cuerpoTabla");
        let tr =document.getElementById("tr"+id);
        table.removeChild(tr);
    }

    delCat(id){
        let select = document.getElementById("select");
        let option = document.getElementById(id);
        select.removeChild(option);
    }

    pintarTotalImport(total){
        document.getElementById("import").textContent = total;
    }

    errorMessage($texto){
        const error = document.getElementById('messages');
        error.innerHTML = `        <div class="row" id="messages">
        <div class="alert alert-danger alert-dismissible" role="alert">
          ${$texto}
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onclick="this.parentElement.remove()"></button>
        </div>
  </div>`
    }

}
module.exports = View;