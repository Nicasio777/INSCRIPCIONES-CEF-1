const URL_SCRIPT = "https://script.google.com/macros/s/AKfycbzxa-uXUJTicFkEWAC9F9vaigwq3pm-1DPUK6cgD3cPtejMbKLzmklM8EaDbGxudDQh/exec"; 
const vistaLista = document.getElementById('vista-lista');
const vistaForm = document.getElementById('vista-formulario');

// Carga inicial
fetch(URL_SCRIPT).then(r => r.json()).then(data => {
    const container = document.getElementById('lista-actividades');
    data.slice(1).forEach(act => {
        container.innerHTML += `<div class="card" onclick="abrirFormulario('${act[0]}')">
            <h3>${act[0]}</h3><p>${act[2]}</p>
        </div>`;
    });
});

function abrirFormulario(nombre) {
    vistaLista.classList.add('oculto');
    vistaForm.classList.remove('oculto');
    document.getElementById('titulo-form').innerText = "Inscripción: " + nombre;
    window.actividadActual = nombre;
}

function volver() {
    vistaForm.classList.add('oculto');
    vistaLista.classList.remove('oculto');
}

document.getElementById('form-inscripcion').onsubmit = async (e) => {
    e.preventDefault();
    const datos = {
        nombre: document.getElementById('nombre').value,
        dni: document.getElementById('dni').value,
        telefono: document.getElementById('telefono').value,
        actividad: window.actividadActual
    };
    // Función para subir a Cloudinary y obtener el link
async function subirArchivo() {
  const file = document.getElementById('archivo').files[0];
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'TU_PRESET_DE_CLOUDINARY'); // Se obtiene en tu cuenta de Cloudinary

  const res = await fetch('https://api.cloudinary.com/v1_1/TU_CLOUD_NAME/upload', {
    method: 'POST',
    body: formData
  });
  const data = await res.json();
  return data.secure_url; // Este es el link que guardaremos en el Sheet
}
    await fetch(URL_SCRIPT, { method: 'POST', mode: 'no-cors', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(datos) });
    alert("¡Inscripción exitosa!");
    location.reload();

};
