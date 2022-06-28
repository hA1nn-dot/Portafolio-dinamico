const grid = new Muuri('.grid', {
    layout: {
        rounding: false
      },
});

window.addEventListener('load',() => {
    grid.refreshItems().layout();
    document.getElementById('grid').classList.add('imagenes-cargadas');

    //Agregamos listener de los enlaces para filtrar por categoria
    const enlaces = document.querySelectorAll("#categorias a")
    enlaces.forEach((element) => {
        element.addEventListener('click', (event) => {
            event.preventDefault() //evitar el comportameinto del navegador
            enlaces.forEach((enlace) => enlace.classList.remove('activo'))
            event.target.classList.add('activo')

            const categoria = event.target.innerHTML.toLowerCase();
            console.log(categoria);
            categoria === 'todos' ? grid.filter('[data-categoria]') :
            grid.filter(`[data-categoria="${categoria}"]`)
        });
    });

    //Agregamos listener de los enlaces para filtrar por busqueda
    document.querySelector('#barra-busqueda').addEventListener('input',(event) =>{
        const busqueda = event.target.value;
        grid.filter( (item) => item.getElement().dataset.etiquetas.includes(busqueda)) 
    });

    //Add listener a las imagenes
    const overlay = document.getElementById("overlay");
    document.querySelectorAll('.grid .item img').forEach((elemento) => {
        const ruta = elemento.getAttribute('src')
        const descripcion = elemento.parentNode.parentNode.dataset.descripcion;

        elemento.addEventListener('click', () => {
            overlay.classList.add('activo');
            document.querySelector('#overlay img').src = ruta
            document.querySelector('#overlay .descripcion').innerHTML = descripcion
        });
    });


    //Eventlister de boton cerrar
    document.querySelector('#btn-cerrar-popup').addEventListener('click', () => {
        overlay.classList.remove('activo');
    });

    //eventListener de overlay
    overlay.addEventListener('click', (event) => {
        // overlay.classList.remove('activo');
        event.target.id === 'overlay' ? overlay.classList.remove('activo') : ''
    });

})