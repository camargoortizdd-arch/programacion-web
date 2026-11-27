var directorio = "https://dvdatogro-123.github.io/PIA_PROGWEB_EQ1/";

var becas = [
    {
        nombre: "Beca Santander de Excelencia Académica",
        institucion: "Santander Open Academy",
        monto: "$100,000 pesos en un solo pago (20 becas en la convocatoria 2026)",
        requisitos: [
            "Estar inscrito en un programa técnico, de licenciatura, maestría o doctorado.",
            "Haber cubierto al menos el 30 % de los créditos del programa.",
            "Ser alumno regular con promedio mínimo de 8.8."
        ],
        proceso: "Registro en la plataforma Santander Open Academy; completar un curso obligatorio; escribir una semblanza de hasta 280 palabras y subir una constancia con calificaciones de máximo 3 meses de antigüedad.",
        registroInicio: "2026-02-16",
        registroFin: "2026-05-12",
        resultadosFin: null,
        fechas: "Fase 1: 16 de febrero al 13 de abril de 2026. Fase 2: 23 de abril al 12 de mayo de 2026. Resultados desde el 30 de junio de 2026. La siguiente convocatoria está por confirmar.",
        imagen: "santander.jpg",
        sitio: "https://app.santanderopenacademy.com",
        fuente: "https://utxicotepec.edu.mx/documentos/Convocatorias/BecaSantanderExcelenciaAcademica2026.pdf"
    },
    {
        nombre: "Beca Fundación Telmex Telcel",
        institucion: "Fundación Telmex Telcel",
        monto: "Entre $1,200 y $1,500 pesos mensuales, además de laptop o tableta, conexión a internet y cursos (hasta 5,000 becas en 2026)",
        requisitos: [
            "Ser estudiante de licenciatura, maestría o doctorado en el antepenúltimo periodo o antes.",
            "Ser alumno regular con promedio mínimo de 8.5.",
            "Acreditar el programa ASUME durante el primer año de la beca."
        ],
        proceso: "Llenar la solicitud en línea desde una computadora y adjuntar constancia de estudios, historial académico, fotografía, CURP, acta de nacimiento y comprobante de domicilio.",
        registroInicio: "2026-08-24",
        registroFin: "2026-09-22",
        resultadosFin: "2026-11-27",
        fechas: "Registro: 24 de agosto al 22 de septiembre de 2026. Resultados: del 18 al 27 de noviembre de 2026 en la página oficial.",
        imagen: "telmex.jpg",
        sitio: "https://www.fundaciontelmextelcel.org/becas",
        fuente: "https://expansion.mx/carrera/2026/08/25/requisitos-fechas-obtener-beca-fundacion-telmex-telcel-slim"
    },
    {
        nombre: "Beca de Escasos Recursos UANL",
        institucion: "Departamento de Becas, UANL",
        monto: "No se publica una cantidad fija: el Departamento de Becas asigna un porcentaje o rechaza la solicitud",
        requisitos: [
            "Ser alumno de la UANL.",
            "No pagar el Recibo de Servicios Académicos y Escolares hasta terminar el proceso de beca.",
            "Entregar documentos: acta de nacimiento, comprobante de domicilio y comprobantes de ingresos de padres o tutores."
        ],
        proceso: "En uanl.mx, Servicios en línea, iniciar sesión con matrícula y contraseña, ir a Becas, Solicitud de beca y subir los documentos en PDF (máximo 600 KB cada uno).",
        registroInicio: null,
        registroFin: null,
        resultadosFin: null,
        estadoFijo: { texto: "Consultar calendario", clase: "proxima" },
        fechas: "Cada facultad tiene su fecha programada; se consulta en la página de la UANL o en el Recibo de Servicios Académicos y Escolares.",
        imagen: "uanl.jpg",
        sitio: "https://www.uanl.mx",
        fuente: "https://www.uanl.mx/wp-content/uploads/2018/08/triptico-becas-2026.pdf"
    },
    {
        nombre: "Beca de Movilidad Académica Internacional",
        institucion: "Fundación UANL A.C.",
        monto: "Apoyo complementario para gastos de manutención durante la estancia en el extranjero (el monto no se indica en la convocatoria); dura hasta 6 meses",
        requisitos: [
            "Haber sido seleccionado en el Programa de Movilidad Académica Internacional con Reconocimiento de Créditos.",
            "Aprobar la evaluación psicológica de la Facultad de Psicología.",
            "Realizar el estudio socioeconómico en el Departamento de Becas."
        ],
        proceso: "Postularse con el formulario de la convocatoria; si es seleccionado, agendar cita y firmar el convenio de asignación de beca con la carta de aceptación de la universidad receptora.",
        registroInicio: "2025-08-18",
        registroFin: "2025-09-12",
        resultadosFin: "2025-10-24",
        fechas: "Última convocatoria encontrada (semestre enero-junio 2026): 18 de agosto al 12 de septiembre de 2025, con resultados el 24 de octubre de 2025. La próxima convocatoria está por confirmar.",
        imagen: "movilidad.jpg",
        sitio: "https://www.uanl.mx",
        fuente: "https://www.uanl.mx/wp-content/uploads/2025/08/convocatoria-beca-enero-junio-2026.pdf"
    }
];

function leerFecha(texto, finDeDia) {
    var partes = texto.split("-");
    var anio = Number(partes[0]);
    var mes = Number(partes[1]) - 1;
    var dia = Number(partes[2]);
    if (finDeDia) {
        return new Date(anio, mes, dia, 23, 59, 59);
    }
    return new Date(anio, mes, dia, 0, 0, 0);
}

function calcularEstado(beca, hoy) {
    if (!beca.registroInicio) {
        return beca.estadoFijo;
    }
    if (hoy < leerFecha(beca.registroInicio, false)) {
        return { texto: "Próxima", clase: "proxima" };
    }
    if (hoy <= leerFecha(beca.registroFin, true)) {
        return { texto: "Abierta", clase: "abierta" };
    }
    if (beca.resultadosFin && hoy <= leerFecha(beca.resultadosFin, true)) {
        return { texto: "En evaluación", clase: "evaluacion" };
    }
    return { texto: "Cerrada", clase: "cerrada" };
}

function crear(etiqueta, texto, clase) {
    var elemento = document.createElement(etiqueta);
    if (texto !== undefined) {
        elemento.textContent = texto;
    }
    if (clase) {
        elemento.className = clase;
    }
    return elemento;
}

function agregarEnlace(padre, texto, url) {
    var parrafo = crear("p");
    var enlace = crear("a", texto);
    enlace.href = url;
    enlace.target = "_blank";
    enlace.rel = "noopener noreferrer";
    parrafo.appendChild(enlace);
    padre.appendChild(parrafo);
}

function crearTarjeta(beca, indice, hoy) {
    var estado = calcularEstado(beca, hoy);
    var tarjeta = crear("article", undefined, "tarjeta");
    var idDetalle = "detalle-" + indice;
    tarjeta.id = "beca-" + (indice + 1);
    tarjeta.setAttribute("data-estado", estado.clase);

    var foto = crear("img", undefined, "foto");
    foto.src = beca.imagen;
    foto.alt = "Imagen de " + beca.nombre;
    tarjeta.appendChild(foto);

    tarjeta.appendChild(crear("span", estado.texto, "estado " + estado.clase));
    tarjeta.appendChild(crear("h3", "🎓 Beca " + (indice + 1) + ": " + beca.nombre));
    tarjeta.appendChild(crear("p", "🏛️ " + beca.institucion, "etiqueta"));
    tarjeta.appendChild(crear("p", "💰 Monto: " + beca.monto));

    var boton = crear("button", "Ver más", "boton");
    boton.type = "button";
    boton.setAttribute("aria-expanded", "false");
    boton.setAttribute("aria-controls", idDetalle);
    tarjeta.appendChild(boton);

    var detalle = crear("div", undefined, "detalle");
    detalle.id = idDetalle;
    detalle.hidden = true;

    detalle.appendChild(crear("p", "📋 Requisitos principales:"));
    var lista = crear("ul");
    for (var i = 0; i < beca.requisitos.length; i++) {
        lista.appendChild(crear("li", beca.requisitos[i]));
    }
    detalle.appendChild(lista);

    detalle.appendChild(crear("p", "📝 Cómo se solicita: " + beca.proceso));
    detalle.appendChild(crear("p", "📅 Fechas: " + beca.fechas));
    agregarEnlace(detalle, "🔗 Sitio oficial", beca.sitio);
    agregarEnlace(detalle, "📄 Fuente de la información", beca.fuente);
    tarjeta.appendChild(detalle);

    boton.addEventListener("click", function () {
        var abierto = !detalle.hidden;
        detalle.hidden = abierto;
        boton.textContent = abierto ? "Ver más" : "Ver menos";
        boton.setAttribute("aria-expanded", String(!abierto));
        if (!abierto && estado.clase === "cerrada") {
            alert("Esta beca está cerrada. La siguiente convocatoria está por confirmar.");
        }
    });

    return tarjeta;
}

function aplicarFiltro(filtro) {
    var vigentes = ["abierta", "evaluacion", "proxima"];
    var tarjetas = document.querySelectorAll("#becas .tarjeta");
    for (var i = 0; i < tarjetas.length; i++) {
        var estado = tarjetas[i].getAttribute("data-estado");
        var visible = filtro === "todas" ||
            (filtro === "vigentes" && vigentes.indexOf(estado) !== -1) ||
            (filtro === "cerradas" && estado === "cerrada");
        tarjetas[i].style.display = visible ? "" : "none";
    }
    var botones = document.querySelectorAll(".filtros button");
    for (var j = 0; j < botones.length; j++) {
        if (botones[j].getAttribute("data-filtro") === filtro) {
            botones[j].classList.add("activo");
        } else {
            botones[j].classList.remove("activo");
        }
    }
}

function crearMenu() {
    var menu = document.getElementById("menu");
    for (var i = 0; i < becas.length; i++) {
        var item = crear("li");
        var enlace = crear("a", "Beca " + (i + 1));
        enlace.href = "#beca-" + (i + 1);
        item.appendChild(enlace);
        menu.appendChild(item);
    }
    var otros = [{ texto: "📄 AF2 XML", url: "../af02/" }, { texto: "💼 AF6 Prácticas", url: "../af06/" }];
    for (var j = 0; j < otros.length; j++) {
        var itemOtro = crear("li");
        var enlaceOtro = crear("a", otros[j].texto);
        enlaceOtro.href = otros[j].url;
        itemOtro.appendChild(enlaceOtro);
        menu.appendChild(itemOtro);
    }
    var itemDirectorio = crear("li");
    var enlaceDirectorio = crear("a", "🏠 Directorio");
    enlaceDirectorio.href = directorio;
    itemDirectorio.appendChild(enlaceDirectorio);
    menu.appendChild(itemDirectorio);
}

function activarFiltros() {
    var botones = document.querySelectorAll(".filtros button");
    for (var i = 0; i < botones.length; i++) {
        botones[i].addEventListener("click", function () {
            aplicarFiltro(this.getAttribute("data-filtro"));
        });
    }
}

function mostrarBecas() {
    var hoy = new Date();
    var contenedor = document.getElementById("becas");
    for (var i = 0; i < becas.length; i++) {
        contenedor.appendChild(crearTarjeta(becas[i], i, hoy));
    }
    crearMenu();
    activarFiltros();
    alert("Bienvenido a mi página de becas. Las becas cerradas te avisarán antes de mostrar su información.");
}

document.addEventListener("DOMContentLoaded", mostrarBecas);
