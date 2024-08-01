import  is_valid  from "./modulo/is_valid";
const formulario = document.querySelector("form");
const nombre = document.querySelector("#nombre");


formulario.addEventListener("submit", (event) => {
    let respuesta = is_valid(event, "form [required]")
    const data = {
        nombre: nombre.value,
    }
    if (respuesta) {
        fetch('http://localhost:3000/users', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
        });
    }
})
