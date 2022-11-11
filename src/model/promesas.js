const SERVER = 'http://localhost:3000'
function deleteProduct(id){
    return new Promise(function(resolve, reject) {
        let peticion = new XMLHttpRequest()
        peticion.open('DELETE', SERVER + '/products/' + id)
        peticion.send()
        peticion.addEventListener('load', () => {
            console.log(peticion.status);
          if (peticion.status === 200) {
            resolve(JSON.parse(peticion.responseText))
          } else {
            reject("Error " + this.status + " (" + this.statusText + ") en la petición")
          }
        })
        peticion.addEventListener('error', () => reject('Error en la petición HTTP'))
        });
}

function addProductoBD(alumno){
    return new Promise(function(resolve, reject) {
        let peticion = new XMLHttpRequest()
        peticion.open('POST', SERVER + '/products')
        peticion.setRequestHeader('Content-type', 'application/json');
        peticion.send(JSON.stringify(alumno))
        peticion.addEventListener('load', () => {
          if (peticion.status == 201) {
            console.log(peticion.responseText)
            resolve(JSON.parse(peticion.responseText))
          } else {
            reject("Error en la petición")
          }
        })
        peticion.addEventListener('error', () => reject('Error en la petición HTTP'))
    });
}

async function actualizar(datos) {
    const response = await fetch(SERVER + '/products/' + datos.id, {
        method: 'PUT', // o 'PUT', 'GET', 'DELETE'
        body: JSON.stringify(datos), // los datos que enviamos al servidor en el 'send'
        headers:{
          'Content-Type': 'application/json'
        }});
    if (!response.ok) {
      throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    const myData = await response.json();
    return myData;
  }

module.exports = {
    addProductoBD,
    deleteProduct,
    actualizar
}