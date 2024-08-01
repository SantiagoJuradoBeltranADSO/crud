const solicitud = async (url) => {
    const response = await fetch(`http://localhost:3000/${url}`);
    const json = await response.json();
    return json;
};


export default solicitud

