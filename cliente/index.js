const inputBusqueda = document.getElementById('inputSearch');
const mostarData = document.getElementById('mostrar-data');
const label = document.getElementById('texto')

label.addEventListener('click', function() {
    inputBusqueda.value = '';
    mostarData.innerHTML = '';
})


inputBusqueda.addEventListener('keyup', function() {

    const xhttp = new XMLHttpRequest();
    xhttp.addEventListener('load', function() {

        const response = JSON.parse(xhttp.responseText);
        mostarData.innerHTML = '';

        if (inputBusqueda.value != '') {
            response.forEach(element => {
                let pais = element.toLowerCase();
                let textoABuscar = inputBusqueda.value.toLowerCase();
                const primeraParte = element.slice(0, pais.indexOf(textoABuscar))
                const ultimaParte = element.slice(pais.indexOf(textoABuscar) + textoABuscar.length)
                    //console.log('primeraParte', primeraParte);
                    //console.log('ultimaParte', ultimaParte)
                const mostrarBusqueda = `${primeraParte}<strong class="color">${inputBusqueda.value}</strong>${ultimaParte}`
                const ul = document.createElement('ul');
                ul.classList.add('lista');
                const li = document.createElement('li');
                ul.appendChild(li);
                li.innerHTML = mostrarBusqueda;

                li.addEventListener('click', function() {
                    li.classList.toggle('magica');
                    inputBusqueda.value = pais;
                })
                mostarData.appendChild(ul);

            });
        }
    })

    let urlData = "";
    if (inputBusqueda.value) {
        urlData += (urlData ? "&" : "") + `search=${inputBusqueda.value}`
    };

    xhttp.open('GET', `/buscar?${urlData}`);
    xhttp.send();

})