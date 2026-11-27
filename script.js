var directorio = "https://dvdatogro-123.github.io/AF03-PIA/";
var archivoXml = "intercambio_fime_2150020.xml";
var avisado = false;

var xmlRespaldo = `<?xml version="1.0" encoding="UTF-8"?>
<intercambio facultad="FIME" institucion="UANL" carrera="Ingeniería en Tecnologías de Software" estudiante="Diego Damián Camargo Ortiz" matricula="2150020" directorio="https://dvdatogro-123.github.io/AF03-PIA/">
    <universidad id="1" tipo="nacional" modalidad="presencial" sitio="https://www.unam.mx">
        <nombre siglas="UNAM">Universidad Nacional Autónoma de México</nombre>
        <pais codigo="MX">México</pais>
        <ciudad estado="Ciudad de México">Ciudad de México</ciudad>
        <programa tipo="Movilidad académica nacional">Estancia académica de un semestre en una facultad de ingeniería para cursar materias afines a Ingeniería en Tecnologías de Software, con reconocimiento de créditos en la FIME de la UANL</programa>
        <duracion periodo="enero-junio o agosto-diciembre">1 semestre</duracion>
        <idioma>Español</idioma>
    </universidad>
    <universidad id="2" tipo="internacional" modalidad="presencial" sitio="https://www.upm.es">
        <nombre siglas="UPM">Universidad Politécnica de Madrid</nombre>
        <pais codigo="ES">España</pais>
        <ciudad comunidad="Comunidad de Madrid">Madrid</ciudad>
        <programa tipo="Movilidad académica internacional">Estancia académica en el extranjero con reconocimiento de créditos, apoyada por la Beca de Movilidad Académica Internacional de la Fundación UANL, para cursar materias de la carrera de Ingeniería en Tecnologías de Software</programa>
        <duracion periodo="enero-junio o agosto-diciembre">Hasta 6 meses</duracion>
        <idioma>Español</idioma>
    </universidad>
</intercambio>`;

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

function leerTexto(universidad, etiqueta) {
    var elemento = universidad.getElementsByTagName(etiqueta)[0];
    return elemento ? elemento.textContent : "";
}

function leerAtributo(universidad, etiqueta, atributo) {
    var elemento = universidad.getElementsByTagName(etiqueta)[0];
    return elemento ? elemento.getAttribute(atributo) : "";
}

function crearTarjeta(universidad, indice) {
    var tipo = universidad.getAttribute("tipo");
    var nombre = leerTexto(universidad, "nombre");
    var siglas = leerAtributo(universidad, "nombre", "siglas");
    var idDetalle = "detalle-" + indice;

    var tarjeta = crear("article", undefined, "tarjeta");
    tarjeta.id = "universidad-" + (indice + 1);

    var foto = crear("img", undefined, "foto");
    foto.src = "universidad" + (indice + 1) + ".jpg";
    foto.alt = "Imagen de " + nombre;
    tarjeta.appendChild(foto);

    if (tipo === "nacional") {
        tarjeta.appendChild(crear("span", "🏠 Nacional", "estado proxima"));
    } else {
        tarjeta.appendChild(crear("span", "🌍 Internacional", "estado abierta"));
    }

    tarjeta.appendChild(crear("h3", "🏫 Universidad " + (indice + 1) + ": " + siglas));
    tarjeta.appendChild(crear("p", "📍 " + leerTexto(universidad, "ciudad") + ", " + leerTexto(universidad, "pais"), "etiqueta"));
    tarjeta.appendChild(crear("p", nombre));

    var boton = crear("button", "Ver más", "boton");
    boton.type = "button";
    tarjeta.appendChild(boton);

    var detalle = crear("div", undefined, "detalle");
    detalle.id = idDetalle;
    detalle.hidden = true;

    detalle.appendChild(crear("p", "🎓 Programa: " + leerAtributo(universidad, "programa", "tipo")));
    detalle.appendChild(crear("p", leerTexto(universidad, "programa")));
    detalle.appendChild(crear("p", "⏱️ Duración: " + leerTexto(universidad, "duracion") + ", periodo " + leerAtributo(universidad, "duracion", "periodo")));
    detalle.appendChild(crear("p", "🗣️ Idioma: " + leerTexto(universidad, "idioma")));
    detalle.appendChild(crear("p", "🧭 Modalidad: " + universidad.getAttribute("modalidad")));

    var enlace = crear("a", "🔗 Sitio oficial de " + siglas);
    enlace.href = universidad.getAttribute("sitio");
    enlace.target = "_blank";
    enlace.rel = "noopener noreferrer";
    enlace.addEventListener("click", function () {
        alert("Vas a abrir el sitio oficial de " + siglas + " en una pestaña nueva.");
    });
    var parrafo = crear("p");
    parrafo.appendChild(enlace);
    detalle.appendChild(parrafo);

    tarjeta.appendChild(detalle);

    boton.addEventListener("click", function () {
        var abierto = !detalle.hidden;
        detalle.hidden = abierto;
        boton.textContent = abierto ? "Ver más" : "Ver menos";
    });

    return tarjeta;
}

function agregarEnlaceMenu(menu, texto, url) {
    var item = crear("li");
    var enlace = crear("a", texto);
    enlace.href = url;
    item.appendChild(enlace);
    menu.appendChild(item);
}

function crearMenu(universidades) {
    var menu = document.getElementById("menu");
    menu.textContent = "";
    for (var i = 0; i < universidades.length; i++) {
        var siglas = leerAtributo(universidades[i], "nombre", "siglas");
        agregarEnlaceMenu(menu, siglas, "#universidad-" + (i + 1));
    }
    agregarEnlaceMenu(menu, "💼 AF6 Prácticas", "../af06/");
    agregarEnlaceMenu(menu, "🎓 AF7 Becas", "../af07/");
    agregarEnlaceMenu(menu, "🏠 Directorio", directorio);
}

function mostrarDatos(raiz) {
    var datos = document.getElementById("datos");
    datos.textContent = "";
    datos.appendChild(crear("p", "🏛️ " + raiz.getAttribute("facultad") + " · " + raiz.getAttribute("institucion")));
    datos.appendChild(crear("p", "👤 Estudiante: " + raiz.getAttribute("estudiante") + " · Matrícula " + raiz.getAttribute("matricula")));
    datos.appendChild(crear("p", "💻 Carrera: " + raiz.getAttribute("carrera")));
}

function mostrarXml(texto) {
    var documento = new DOMParser().parseFromString(texto, "application/xml");
    var raiz = documento.documentElement;
    var universidades = documento.getElementsByTagName("universidad");
    var contenedor = document.getElementById("universidades");

    contenedor.textContent = "";
    mostrarDatos(raiz);
    for (var i = 0; i < universidades.length; i++) {
        contenedor.appendChild(crearTarjeta(universidades[i], i));
    }
    document.getElementById("codigo").textContent = texto;
    crearMenu(universidades);

    if (!avisado) {
        avisado = true;
        alert("Bienvenido a la página de intercambio académico de la FIME. Se cargaron " + universidades.length + " universidades desde el archivo XML.");
    }
}

function cargarXml() {
    fetch(archivoXml)
        .then(function (respuesta) {
            if (!respuesta.ok) {
                throw new Error("No se pudo leer el XML");
            }
            return respuesta.text();
        })
        .then(mostrarXml)
        .catch(function () {
            mostrarXml(xmlRespaldo);
        });
}

document.addEventListener("DOMContentLoaded", cargarXml);
