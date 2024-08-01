
import correo from './modulo/correo.js';
import numeros from './modulo/numeros.js';
import letras from './modulo/letras.js';
import is_valid from './modulo/is_valid.js';
import solicitud from './modulo/ajax.js';
const $formulario = document.querySelector("form");
const nombre = document.querySelector("#nombre");
const apellido = document.querySelector("#apellido");
const telefono = document.querySelector("#telefono");
const direccion = document.querySelector("#direccion");
const tipo_documento = document.querySelector("#tipo_documento");
const documento = document.querySelector("#documento");
const politicas = document.querySelector("#politicas");
const button = document.querySelector('#button')
const email = document.querySelector("#email")
const documentos = () => {
    const fragmento = document.createDocumentFragment();
    let seleccionar = document.createElement("option");
    seleccionar.value = "";
    seleccionar.text = "Seleccionar";
    fragmento.appendChild(seleccionar);
    fetch('http://localhost:3000/documents')
        .then((response) => response.json())
        .then((data) => {
            data.forEach(element => {
                console.log(element); // Asegúrate de que `element` esté definido en el contexto
                let option = document.createElement("option");
                option.value = element.id;
                option.text = element.nombre;
                fragmento.appendChild(option);
            });
            tipo_documento.appendChild(fragmento); // Añade el fragmento al select
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};

documentos();

const listar =  () =>{
  let data=  solicitud("users");
console.log(data)
}
listar()


const remover = (e, input) =>{
    if (input.value != "") {
        input.classList.remove("error");
        input.classList.add("correcto");
    }else{
        input.classList.remove("correcto");
        input.classList.add("error");
    }
}

const vaciarCampos = () => {
    const campos = [$formulario.elements];
    campos.forEach(campo => {
        if (campo.type !== 'submit' && campo.type !== 'checkbox') {
            campo.value = '';
        } else if (campo.type === 'checkbox') {
            campo.checked = false;
        }
    });
};

$formulario.addEventListener("submit", (event) => {
    event.preventDefault(); // Evita el envío del formulario por defecto
    let response = is_valid(event, "form [required]");
    if (response) {
        alert("Formulario enviado");
        const data = {
            first_name: nombre.value,
            last_name: apellido.value,
            address: direccion.value,
            type_doc: tipo_documento.value,
            email: email.value,
            phone: telefono.value,
            type: documento.value
        };
        fetch('http://localhost:3000/users', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then(response => {
            if (response.ok) {
                alert("Formulario enviado con éxito");
                vaciarCampos(); // Vacía los campos después de enviar el formulario
            } else {
                alert("Error al enviar el formulario");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Error al enviar el formulario");
        });
    } else {
        console.error("Por favor, completa todos los campos requeridos.");
    }
});



nombre.addEventListener("blur", (event) => {
    remover(event, nombre);
});
apellido.addEventListener("blur", (event) => {
    remover(event, apellido);
});
telefono.addEventListener("blur", (event) => {
    remover(event, telefono);
});
direccion.addEventListener("blur", (event) => {
    remover(event, direccion);
});
tipo_documento.addEventListener("blur", (event) => {
    remover(event, tipo_documento);
});
documento.addEventListener("blur", (event) => {
    remover(event, documento);
});

email.addEventListener("blur", (event) => {
    correo(event, email);
});

documento.addEventListener("DOMContentLoaded", (event) => {
    if (!politicas.checked) {
        button.setAttribute("disabled", "");    
    }
});

politicas.addEventListener("change", (event) => {
    console.log(event.target.checked);
    if (event.target.checked) {
        button.removeAttribute("disabled");
    } else {
        button.setAttribute("disabled", "");
    }
});

nombre.addEventListener("keyup", (event) => {
    letras(event);
});
documento.addEventListener("keypress", numeros) 
telefono.addEventListener("keypress", numeros )
nombre.addEventListener("keypress", (event)=>{
    letras(event, nombre)
})
apellido.addEventListener("keypress", (event)=>{
    letras(event, apellido)
})

