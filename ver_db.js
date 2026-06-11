import { readFileSync } from 'fs';

const alumnos = JSON.parse(readFileSync(new URL('./alumnos_mock.json', import.meta.url), 'utf-8'));

console.log('\n\x1b[1;36m' + '='.repeat(60));
console.log('  CAMPUS VIRTUAL UMAI — Colección: alumnos');
console.log('='.repeat(60) + '\x1b[0m');
console.log(`Total de documentos: \x1b[33m${alumnos.length}\x1b[0m\n`);

// Tabla resumen de alumnos
const resumen = alumnos.map(a => ({
  _id: a._id.$oid.slice(-6),
  Legajo: a.legajo,
  Alumno: `${a.nombre} ${a.apellido}`,
  Carrera: a.carrera,
  Año: a.anioCursada,
  Materias: a.materias.length,
  Cursando: a.materias.filter(m => m.estado === 'cursando').length,
  Aprobadas: a.materias.filter(m => m.estado === 'aprobada').length,
}));
console.table(resumen);

// Vista detallada de cada alumno
alumnos.forEach((a, idx) => {
  console.log('\n' + '\x1b[1;34m' + '─'.repeat(50));
  console.log(`  [${idx + 1}] ${a.nombre} ${a.apellido}  |  ${a.legajo}  |  ${a.estado}`);
  console.log('─'.repeat(50) + '\x1b[0m');
  console.log(`  Email: ${a.email}`);
  console.log(`  DNI: ${a.dni}  |  Nac: ${a.fechaNacimiento}  |  Tel: ${a.telefono}`);
  console.log(`  Dirección: ${a.direccion.calle}, ${a.direccion.ciudad} (${a.direccion.provincia})`);
  console.log(`  Carrera: ${a.carrera}  |  Año: ${a.anioCursada}°  |  Modalidad: ${a.modalidad}`);
  console.log(`  Ingreso: ${a.fechaIngreso}\n`);

  // Materias como tabla
  const materias = a.materias.map(m => ({
    Materia: m.nombre,
    Año: m.anio,
    Estado: m.estado,
    Nota: m.nota ?? '—',
    Profesor: m.profesor,
    Horario: m.horario ?? m.fechaAprobacion ?? m.fechaInscripcion ?? '—',
  }));
  console.table(materias);
});

console.log('\n\x1b[1;32m' + '✓'.repeat(55));
console.log('  FIN DEL REPORTE — 15 alumnos · ' + alumnos.reduce((s, a) => s + a.materias.length, 0) + ' materias totales');
console.log('✓'.repeat(55) + '\x1b[0m\n');
