//Se selecciona el elemento HTML con la clase "current-date" para mostrar la fecha actual.
const fechaActual = document.querySelector(".current-date");

//Se selecciona el elemento ul con la clase "days" donde se renderizarán los días del calendario.
const dias = document.querySelector(".days");

//Se selecciona los elementos <span> dentro del contenedor con la clase "icons" para manejar los botones de navegación (prev/next).
const desplazamiento = document.querySelectorAll(".icons span");

//Se obtiene la fecha actual, el año actual y el mes actual.
let fecha = new Date();
let anioActual = fecha.getFullYear();
let mesActual = fecha.getMonth();

// console.log(fecha,anioActual,mesActual);
//Array que contiene los nombres de los meses.
const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"];

//Función que renderiza el calendario.
const renderCalendar = () => {
    //se calcula el día de la semana del primer día del mes (0 = domingo, 6 = sábado).
    let primerDiaDelMes = new Date(anioActual, mesActual, 1).getDay();
    // Obtiene el último día del mes actual (por ejemplo, 28, 30 o 31).
    let ultimaFechaDelMes = new Date(anioActual, mesActual + 1, 0).getDate();
    // Obtiene el último día del mes anterior.
    let ultimoDiaMesAnterior = new Date(anioActual, mesActual, 0).getDate();
    // Calcula el día de la semana del último día del mes actual.
    let ultimoDiaDelMesActual = new Date(anioActual, mesActual, ultimaFechaDelMes).getDay();

    // console.log(ultimaFechaDelMes);
    let listaDias = "";
    // Renderiza los días del mes anterior que aparecen como "inactivos".
    for (let i = primerDiaDelMes; i > 0; i--) {
        listaDias += `<li class="inactive">${ultimoDiaMesAnterior - i + 1}</li>`
    }
    // Renderiza los días del mes actual.
    for (let i = 1; i <= ultimaFechaDelMes; i++) {
        // console.log(i);
        // Verifica si el día actual coincide con el día real de hoy (resalta ese día como "active").
        let fechaActual = i === fecha.getDate() && mesActual === new Date().getMonth() && anioActual === new Date().getFullYear() ? "active" : " ";
        // Agrega el día al calendario, con la clase "active" si corresponde.
        listaDias += `<li class="${fechaActual}">${i}</li>`;
        // listaDias += `<li>${i}</li>`;
    }

    // Renderiza los días del próximo mes que aparecen como "inactivos".
    for (let i = ultimoDiaDelMesActual; i < 6; i++) {
        // console.log(i);
        listaDias += `<li class="inactive">${i - ultimoDiaDelMesActual + 1}</li>`
    }
    // Muestra el nombre del mes y el año actual en el contenedor de fecha.
    fechaActual.innerHTML = `${meses[mesActual]} ${anioActual}`;
    console.log(meses[mesActual]);
    // Inserta la lista de días en el contenedor del calendario.
    dias.innerHTML = listaDias;
}

// Llama a la función para renderizar el calendario al cargar la página.
renderCalendar();

// Agrega un evento "click" a cada ícono de navegación (prev/next).
desplazamiento.forEach(icon => {
    icon.addEventListener("click", () => {
        console.log(icon);

         // Identifica si el usuario hizo clic en "prev" o "next" para cambiar el mes.
        mesActual = icon.id === "prev" ? mesActual - 1 : mesActual + 1;

        // Ajusta el año y el mes si se pasa del rango (0 = enero, 11 = diciembre).
        if (mesActual < 0 || mesActual > 11) {
            fecha = new Date(anioActual, mesActual);// Ajusta la fecha al año correspondiente.
            anioActual = fecha.getFullYear();// Actualiza el año actual.
            mesActual = fecha.getMonth(); // Actualiza el mes actual.
        } else {
             // Si no hay cambio de año, usa la fecha actual.
            fecha = new Date();
        }

         // Vuelve a renderizar el calendario con el nuevo mes/año.
        renderCalendar();
    });
});

