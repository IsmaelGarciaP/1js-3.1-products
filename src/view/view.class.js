'use strict'
const Product = require('../model/product.class');
class View {
    constructor(){
        
    }

    pintarProducto(producto, callback, callback1){
        let table =document.getElementById("cuerpoTabla");
        let tr = document.createElement('tr');
        tr.id="tr"+producto.id;
        tr.innerHTML = `                            <td>${producto.id}</td>
        <td id="name${producto.id}">${producto.name}</td>
        <td id="category${producto.id}">${producto.category}</td>
        <td id="unid${producto.id}">${producto.units}</td>
        <td id="price${producto.id}">${producto.price}€/u</td>
        <td id="importe${producto.id}">${producto.productImport()} €</td>
        <td>
        <button class="btn-add-unit${producto.id}">
        <span class="material-icons">arrow_drop_up</span>
        </button>
        <button class="btn-del-unit${producto.id}" >
        <span class="material-icons">arrow_drop_down</span>
        </button>
        <button class="btn-edit${producto.id}">
        <span class="material-icons">edit</span>
        </button>
        <button class="btn-del${producto.id}">
        <span class="material-icons">delete</span>
        </button></td>`
        if(producto.units == 0){
            tr.querySelector(".btn-del-unit" + producto.id ).setAttribute("disabled", "true");
        }
        tr.querySelector(".btn-del"+producto.id).addEventListener("click", ()=>{
            callback(producto.id);
        });

        tr.querySelector(".btn-add-unit" + producto.id ).addEventListener("click", ()=>{
            producto.addUnid();
            document.getElementById("unid" + producto.id).textContent = producto.units;
            tr.querySelector(".btn-del-unit" + producto.id ).removeAttribute("disabled");
            this.pintarTotalImport(callback1()); 
            document.getElementById("importe" + producto.id).innerText = producto.productImport()
        });

        tr.querySelector(".btn-del-unit" + producto.id ).addEventListener("click", ()=>{
            if(producto.units == 0){
                tr.querySelector(".btn-del-unit" + producto.id ).setAttribute("disabled", "true");
            }else{
                producto.delUnid();
                document.getElementById("unid" + producto.id).textContent = producto.units;
                if(producto.units == 0){
                    tr.querySelector(".btn-del-unit" + producto.id ).setAttribute("disabled", "true");
                }
            }
            this.pintarTotalImport(callback1());
            document.getElementById("importe" + producto.id).innerText = producto.productImport()
        });

        tr.querySelector(".btn-edit" + producto.id ).addEventListener("click", ()=>{
            document.getElementById('div-new-prod').classList.remove('ocultar');
            let id = producto.id
           this.rellenarForm(producto);
        });
        
        table.appendChild(tr);
    }

    modificarTabla(product){
        let tr = document.getElementById("tr"+product.id);
        document.getElementById("name" + product.id).innerText = product.name
        document.getElementById("category" + product.id).innerText = product.category
        document.getElementById("unid" + product.id).innerText = product.units
        document.getElementById("price" + product.id).innerText = product.price
        document.getElementById("importe" + product.id).innerText = product.productImport()
    }

    rellenarSelect(cat){
        let select = document.getElementById("select");
        let option = document.createElement('option');
        option.id = cat.id;
        option.setAttribute("value",cat.id)
        let optionTxt = document.createTextNode(cat.name);
        option.appendChild(optionTxt);
        select.appendChild(option);
    }

    rellenarForm(product){
        document.getElementById("id-pro").value = product.id;
        document.getElementById("newprod-name").value = product.name;
        document.getElementById("select").value = product.category;
        document.getElementById("newprod-units").value = product.units;
        document.getElementById("newprod-price").value = product.price;
        document.getElementById("add-prduct");
        document.getElementById("add-prduct").innerText = "Cambiar";
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