const loginForm    = document.getElementById('login-form');
const loginError   = document.getElementById('login-error');
const loginSection = document.getElementById('login-container');
const dashSection  = document.getElementById('dashboard-container');
const alumnoNombre = document.getElementById('alumno-nombre');
const materiasContainer = document.getElementById('materias-container');
const btnLogout    = document.getElementById('btn-logout');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  loginError.textContent = '';

  const usuario    = document.getElementById('usuario').value.trim();
  const contrasena = document.getElementById('contrasena').value;

  if (!usuario || !contrasena) {
    loginError.textContent = 'Completá todos los campos.';
    return;
  }

  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, contrasena }),
    });

    const data = await res.json();

    if (!res.ok) {
      loginError.textContent = data.error || 'Error al iniciar sesión.';
      return;
    }

    mostrarDashboard(data);
  } catch {
    loginError.textContent = 'Error de conexión con el servidor.';
  }
});

function mostrarDashboard({ nombre_completo, materias }) {
  alumnoNombre.textContent = `Hola, ${nombre_completo}`;

  materiasContainer.innerHTML = '';

  if (!materias || materias.length === 0) {
    materiasContainer.innerHTML = '<p class="empty">No tenés materias cargadas.</p>';
  } else {
    materias.forEach((m) => {
      const card = document.createElement('div');
      card.className = `materia-card estado-${m.estado}`;

      card.innerHTML = `
        <h4>${m.nombre}</h4>
        <div class="nota">${m.nota}</div>
        <span class="estado-badge">${m.estado}</span>
      `;

      materiasContainer.appendChild(card);
    });
  }

  loginSection.classList.add('hidden');
  dashSection.classList.remove('hidden');
}

btnLogout.addEventListener('click', () => {
  dashSection.classList.add('hidden');
  loginSection.classList.remove('hidden');
  loginForm.reset();
  loginError.textContent = '';
});
