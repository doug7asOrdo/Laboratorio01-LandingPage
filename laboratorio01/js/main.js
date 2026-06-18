const CLAVE_TEMA = 'celustore-theme';

const botonTema = document.getElementById('cambiarTema');
const iconoTema = document.getElementById('temaIcono');
const elementoHtml = document.documentElement;

function aplicarTema(tema) {
    if (tema === 'dark') {
        elementoHtml.setAttribute('data-theme', 'dark');
        iconoTema.textContent = '☀️';
        botonTema.setAttribute('aria-label', 'Cambiar a modo claro');
    } else {
        elementoHtml.removeAttribute('data-theme');
        iconoTema.textContent = '🌙';
        botonTema.setAttribute('aria-label', 'Cambiar a modo oscuro');
    }
}

function alternarTema() {
    const temaActual = elementoHtml.getAttribute('data-theme');

    const nuevoTema = temaActual === 'dark' ? 'light' : 'dark';

    aplicarTema(nuevoTema);

    localStorage.setItem(CLAVE_TEMA, nuevoTema);
}

botonTema.addEventListener('click', alternarTema);


(function iniciarTema() {
    const temaGuardado = localStorage.getItem(CLAVE_TEMA) || 'light';
    aplicarTema(temaGuardado);
})();



/* 2. Menú Hamburguesa mobile*/
const botonMenu = document.getElementById('botonmenu');
const menuPrincipal = document.getElementById('menuPrincipal');

botonMenu.addEventListener('click', function () {
    // toggle() se agrega la clase si no existe, la quita si existe
    menuPrincipal.classList.toggle('open');

    const estaAbierto = menuPrincipal.classList.contains('open');
    botonMenu.setAttribute('aria-expanded', estaAbierto ? 'true' : 'false');
    botonMenu.setAttribute('aria-label', estaAbierto ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
});

menuPrincipal.querySelectorAll('a').forEach(function (enlace) {
    enlace.addEventListener('click', function () {
        menuPrincipal.classList.remove('open');
        botonMenu.setAttribute('aria-expanded', 'false');
    });
});

/* Form de conctato localStorage */

const CLAVE_NOMBRE_FORMULARIO = 'celustore-contact-name';

const campoNombre = document.getElementById('nombreContacto');
const campoEmail = document.getElementById('emailContacto');
const campoMensaje = document.getElementById('mensajeContacto');
const formularioContacto = document.querySelector('.contacto-formulario');
const mensajeFeedback = document.getElementById('mensajeFormulario');

(function iniciarFormulario() {
    const nombreGuardado = localStorage.getItem(CLAVE_NOMBRE_FORMULARIO);
    if (nombreGuardado) {
        campoNombre.value = nombreGuardado;
    }
})();

campoNombre.addEventListener('input', function () {
    if (this.value.trim() !== '') {
        localStorage.setItem(CLAVE_NOMBRE_FORMULARIO, this.value.trim());
    } else {
        localStorage.removeItem(CLAVE_NOMBRE_FORMULARIO);//campo vacio se elimina el localStorage
    }
});


formularioContacto.addEventListener('submit', function (evento) {
    evento.preventDefault(); // se vita que el navegador recargue la página al enviar

    const nombre = campoNombre.value.trim();
    const email = campoEmail.value.trim();
    const mensaje = campoMensaje.value.trim();

    if (!nombre || !email || !mensaje) {
        mensajeFeedback.textContent = '⚠️ Por favor completá todos los campos.';
        mensajeFeedback.style.color = '#c62828'; 
        return; // Se sale de la función si hay error
    }
    
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
        mensajeFeedback.textContent = '⚠️ Por favor ingresá un correo válido.';
        mensajeFeedback.style.color = '#c62828';
        return;
    }
    
    mensajeFeedback.textContent = `✅ ¡Gracias ${nombre}! Tu mensaje fue enviado. Te contactaremos pronto.`;
    mensajeFeedback.style.color = '#2e7d32'; 

    campoEmail.value = '';
    campoMensaje.value = '';
});