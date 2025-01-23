// Selección de elementos HTML
const contenedorFecha = document.querySelector(".current-date");
const listaDiasContenedor = document.querySelector(".days");
const botonesNavegacion = document.querySelectorAll(".icons span");

// Constantes y variables para manejar fechas
const fecha = new Date();
let anioActual = fecha.getFullYear();
let mesActual = fecha.getMonth();

// Array de nombres de los meses
const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"];

// Función para obtener una fecha específica
const obtenerFecha = (anio, mes, dia) => new Date(anio, mes, dia);

// Función para renderizar el calendario
const renderCalendar = () => {
    //se calcula el día de la semana del primer día del mes (0 = domingo, 6 = sábado).
    const primerDiaDelMes = obtenerFecha(anioActual, mesActual, 1).getDay();
     // Obtiene el último día del mes actual (por ejemplo, 28, 30 o 31).
    const ultimaFechaDelMes = obtenerFecha(anioActual, mesActual + 1, 0).getDate();
    /*
    En JavaScript, si pasas 0 como día, el objeto Date retrocede al último día del mes anterior. Esto permite calcular el último día de cualquier mes.
    */
    // console.log(mesActual+1);
    
    // Obtiene el último día del mes anterior.
    const ultimoDiaMesAnterior = obtenerFecha(anioActual, mesActual, 0).getDate();
    // Calcula el día de la semana del último día del mes actual(0 = domingo, 6 = sábado).
    const ultimoDiaDelMesActual = obtenerFecha(anioActual, mesActual, ultimaFechaDelMes).getDay();
    
    let listaDias = "";

    // Días inactivos del mes anterior
    for (let i = primerDiaDelMes; i > 0; i--) {
        listaDias += `<li class="inactive">${ultimoDiaMesAnterior - i + 1}</li>`;
    }

    // Días del mes actual
    for (let i = 1; i <= ultimaFechaDelMes; i++) {
        const claseDiaActual = i === fecha.getDate() && mesActual === fecha.getMonth() && anioActual === fecha.getFullYear() ? "active" : "";
        listaDias += `<li class="${claseDiaActual}">${i}</li>`;
    }

    // Días inactivos del próximo mes
    for (let i = ultimoDiaDelMesActual; i < 6; i++) {
        // console.log(ultimoDiaDelMesActual);
        listaDias += `<li class="inactive">${i - ultimoDiaDelMesActual + 1}</li>`;
        // console.log("i == " + i);
        // console.log(i - ultimoDiaDelMesActual + 1);  
    }

    contenedorFecha.innerHTML = `${meses[mesActual]} ${anioActual}`;
    listaDiasContenedor.innerHTML = listaDias;
};

// Inicializa el calendario
renderCalendar();

// Navegación entre meses
botonesNavegacion.forEach(icon => {
    icon.addEventListener("click", () => {
        mesActual += icon.id === "prev" ? -1 : 1;
        
        if (mesActual < 0) {
            mesActual = 11;
            anioActual -= 1;
        } else if (mesActual > 11) {
            mesActual = 0;
            anioActual += 1;
        }

        renderCalendar();
    });
});