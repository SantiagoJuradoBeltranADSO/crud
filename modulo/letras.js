const letras = (event) => {
    let letras = /^[a-zA-ZÀ-ÿ\s]+$/;
    if (letras.test(event.key)) {
        console.log("sí");
    } else {
        event.preventDefault();
    }
};
export default letras;