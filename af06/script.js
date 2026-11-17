var empresas = [
    {
        nombre: "Softtek",
        giro: "Servicios de tecnologías de la información",
        ubicacion: "Sede en Monterrey, Nuevo León",
        descripcion: "Softtek es una empresa privada mexicana de servicios de tecnologías de la información y consultoría, fundada en diciembre de 1982 en Monterrey, Nuevo León",
        areas: ["Desarrollo de aplicaciones web y móviles", "Pruebas de software", "Seguridad y soporte de sistemas"],
        porQue: "Su trabajo diario es desarrollo, pruebas y mantenimiento de software y su sede está en Monterrey.",
        imagen: "softtek.jpg",
        sitio: "https://www.softtek.com"
    },
    {
        nombre: "Accenture",
        giro: "Consultoría y tecnología",
        ubicacion: "Oficinas en México",
        descripcion: "Accenture es una empresa global de servicios profesionales que ofrece soluciones en estrategia, consultoría, tecnología, digital y operaciones.",
        areas: ["Desarrollo de software", "Datos e inteligencia artificial", "Computación en la nube"],
        porQue: "Para conocer varias tecnologías y metodologías de desarrollo.",
        imagen: "accenture.jpg",
        sitio: "https://www.accenture.com/mx-es"
    },
    {
        nombre: "Microsoft",
        giro: "Software y servicios en la nube",
        ubicacion: "Oficinas en México",
        descripcion: "Microsoft Corporation es una empresa tecnológica multinacional. Es una de las compañías de software y servicios en la nube más grandes del mundo.",
        areas: ["Ingeniería de software", "Computación en la nube", "Herramientas para desarrolladores"],
        porQue: "Trabajan con lenguajes y herramientas que uso en la carrera.",
        imagen: "microsoft.jpg",
        sitio: "https://careers.microsoft.com"
    }
];

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

function crearTarjeta(empresa, indice) {
    var tarjeta = crear("article", undefined, "tarjeta");
    var idDetalle = "detalle-" + indice;
    tarjeta.id = "empresa-" + (indice + 1);

    var foto = crear("img", undefined, "foto");
    foto.src = empresa.imagen;
    foto.alt = "Imagen de " + empresa.nombre;
    tarjeta.appendChild(foto);

    tarjeta.appendChild(crear("h3", "Empresa " + (indice + 1) + ": " + empresa.nombre));
    tarjeta.appendChild(crear("p", empresa.giro + " · " + empresa.ubicacion, "etiqueta"));
    tarjeta.appendChild(crear("p", empresa.descripcion));

    var boton = crear("button", "Ver más", "boton");
    boton.type = "button";
    boton.setAttribute("aria-expanded", "false");
    boton.setAttribute("aria-controls", idDetalle);
    tarjeta.appendChild(boton);

    var detalle = crear("div", undefined, "detalle");
    detalle.id = idDetalle;
    detalle.hidden = true;

    detalle.appendChild(crear("p", "Áreas donde podría realizar mis prácticas:"));
    var lista = crear("ul");
    for (var i = 0; i < empresa.areas.length; i++) {
        lista.appendChild(crear("li", empresa.areas[i]));
    }
    detalle.appendChild(lista);

    detalle.appendChild(crear("p", "Por qué me interesa: " + empresa.porQue));

    var enlace = crear("a", "Sitio oficial de " + empresa.nombre);
    enlace.href = empresa.sitio;
    enlace.target = "_blank";
    enlace.rel = "noopener noreferrer";
    var parrafo = crear("p");
    parrafo.appendChild(enlace);
    detalle.appendChild(parrafo);

    tarjeta.appendChild(detalle);

    boton.addEventListener("click", function () {
        var abierto = !detalle.hidden;
        detalle.hidden = abierto;
        boton.textContent = abierto ? "Ver más" : "Ver menos";
        boton.setAttribute("aria-expanded", String(!abierto));
    });

    return tarjeta;
}

function crearMenu() {
    var menu = document.getElementById("menu");
    for (var i = 0; i < empresas.length; i++) {
        var item = crear("li");
        var enlace = crear("a", empresas[i].nombre);
        enlace.href = "#empresa-" + (i + 1);
        item.appendChild(enlace);
        menu.appendChild(item);
    }
}

function mostrarEmpresas() {
    var contenedor = document.getElementById("empresas");
    for (var i = 0; i < empresas.length; i++) {
        contenedor.appendChild(crearTarjeta(empresas[i], i));
    }
    crearMenu();
}

document.addEventListener("DOMContentLoaded", mostrarEmpresas);
