
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
const tp_users =document.querySelector("#tb_users").content
const fragmento = document.createDocumentFragment();
const tbody = document.querySelector("tbody")

console.log(tp_users)
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
                //console.log(element); 
                let option = document.createElement("option");
                option.value = element.id;
                option.text = element.nombre;
                fragmento.appendChild(option);
            });
            tipo_documento.appendChild(fragmento); 
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};

documentos();

const listar = async() =>{
const data = await solicitud ("users")
data.forEach(element=>{
    tp_users.querySelector(".nombre").textContent= element.first_name
    tp_users.querySelector(".apellido").textContent= element.last_name
    tp_users.querySelector(".direccion").textContent= element.address
    tp_users.querySelector(".tipo_documento").textContent= element.type_id
    tp_users.querySelector(".email").textContent= element.email
    tp_users.querySelector(".telefono").textContent= element.phone
    tp_users.querySelector(".numero_documento").textContent= element.document
    const clone = document.importNode(tp_users,true)
    fragmento.appendChild(clone);
})
tbody.appendChild(fragmento)
}
const createRow = (data)=>{
    const tr = tbody.insertRow(-1);
    const tdnombre=tr.insertCell(0);
    const tdapellido=tr.insertCell(1);
    const tdemail=tr.insertCell(2);
    const tddireccion=tr.insertCell(3);
    const tdtelefono=tr.insertCell(4);
    const tdnumero_documento=tr.insertCell(5);
    const tdtipo_documento=tr.insertCell(6);
    tdnombre.textContent=data.first_name;
    tdapellido.textContent=data.last_name;
    tdtipo_documento.textContent=data.type_id;
    tdemail.textContent=data.email;
    tddireccion.textContent=data.address;
    tdtelefono.textContent=data.phone;
    tdnumero_documento.textContent=data.document;

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
nombre.value="" ;
apellido.value="" ;
direccion.value="" ;
email.value="" ;
telefono.value="" ;
documento.value="" ;
tipo_documento.selectedIndex = 0;
politicas.value = false;

};
$formulario.addEventListener("submit" , (event)=>{
    let response = is_valid(event, "form [required]");
    if (response) {
        const data ={
            first_name: nombre.value,
            last_name: apellido.value,
            address: direccion.value,
            type_id: tipo_documento.value,
            email: email.value,
            phone: telefono.value,
            document: documento.value,
        }
        fetch('http://localhost:3000/users',{
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then((json) => {
         vaciarCampos()
        createRow(json)
        });
    }else{
        alert("campos nulos")
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

